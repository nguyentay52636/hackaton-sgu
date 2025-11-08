"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import { Badge } from "@/shared/ui/badge"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Input } from "@/shared/ui/input"
import {
    Languages,
    ArrowLeft,
    Volume2,
    Copy,
    Check,
    ArrowLeftRight,
    Sparkles,
    BookOpen,
    Save,
    Mic,
    X,
    Star,
    Clock,
    Download,
    Globe,
    Lightbulb,
    MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"

interface SavedWord {
    id: string
    original: string
    translation: string
    fromLang: string
    toLang: string
    examples: string[]
    savedAt: Date
    isFavorite?: boolean
}

interface TranslationHistory {
    id: string
    original: string
    translation: string
    fromLang: string
    toLang: string
    timestamp: Date
}

interface Alternative {
    text: string
    confidence: number
}

const LANGUAGES = [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
]

export function Translator() {
    const [sourceText, setSourceText] = useState("")
    const [translatedText, setTranslatedText] = useState("")
    const [sourceLang, setSourceLang] = useState("vi")
    const [targetLang, setTargetLang] = useState("en")
    const [examples, setExamples] = useState<string[]>([])
    const [alternatives, setAlternatives] = useState<Alternative[]>([])
    const [isTranslating, setIsTranslating] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [copied, setCopied] = useState(false)
    const [savedWords, setSavedWords] = useState<SavedWord[]>([])
    const [history, setHistory] = useState<TranslationHistory[]>([])
    const [activeTab, setActiveTab] = useState<"translate" | "history" | "saved">("translate")
    const [detectedLang, setDetectedLang] = useState<string | null>(null)
    const [autoDetect, setAutoDetect] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { toast } = useToast()

    useEffect(() => {
        const saved = localStorage.getItem("saved-words")
        const historyData = localStorage.getItem("translation-history")
        if (saved) setSavedWords(JSON.parse(saved))
        if (historyData) setHistory(JSON.parse(historyData))
    }, [])

    useEffect(() => {
        if (!sourceText.trim()) return

        const timer = setTimeout(() => {
            handleTranslate(true)
        }, 1000)

        return () => clearTimeout(timer)
    }, [sourceText])

    const swapLanguages = () => {
        const temp = sourceLang
        setSourceLang(targetLang)
        setTargetLang(temp)
        setSourceText(translatedText)
        setTranslatedText(sourceText)
    }

    const handleTranslate = async (isAuto = false) => {
        if (!sourceText.trim()) return

        if (!isAuto) setIsTranslating(true)

        try {
            // Translate
            const translateResponse = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: sourceText,
                    sourceLang,
                    targetLang,
                }),
            })
            const translateData = await translateResponse.json()
            setTranslatedText(translateData.translation)

            const [examplesResponse, alternativesResponse] = await Promise.all([
                fetch("/api/get-examples", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        word: sourceText,
                        sourceLang,
                        targetLang,
                    }),
                }),
                fetch("/api/get-alternatives", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        text: sourceText,
                        sourceLang,
                        targetLang,
                    }),
                }),
            ])

            const examplesData = await examplesResponse.json()
            const alternativesData = await alternativesResponse.json()

            setExamples(examplesData.examples || [])
            setAlternatives(alternativesData.alternatives || [])

            const newHistory: TranslationHistory = {
                id: Date.now().toString(),
                original: sourceText,
                translation: translateData.translation,
                fromLang: sourceLang,
                toLang: targetLang,
                timestamp: new Date(),
            }
            const updatedHistory = [newHistory, ...history.slice(0, 49)]
            setHistory(updatedHistory)
            localStorage.setItem("translation-history", JSON.stringify(updatedHistory))

            if (!isAuto) {
                toast({
                    title: "Dịch thành công",
                    description: `Đã dịch sang ${LANGUAGES.find((l) => l.code === targetLang)?.name}`,
                })
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể dịch văn bản",
                variant: "destructive",
            })
        } finally {
            if (!isAuto) setIsTranslating(false)
        }
    }

    const speakText = (text: string, lang: string) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel()
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = lang === "vi" ? "vi-VN" : lang === "en" ? "en-US" : `${lang}-${lang.toUpperCase()}`
            utterance.rate = 0.9
            window.speechSynthesis.speak(utterance)

            toast({
                title: "Đang phát âm",
                description: "Nghe cách phát âm",
            })
        }
    }

    const startRecording = () => {
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            toast({
                title: "Không hỗ trợ",
                description: "Trình duyệt không hỗ trợ nhận dạng giọng nói",
                variant: "destructive",
            })
            return
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.lang = sourceLang === "vi" ? "vi-VN" : `${sourceLang}-${sourceLang.toUpperCase()}`
        recognition.continuous = false
        recognition.interimResults = false

        recognition.onstart = () => {
            setIsRecording(true)
            toast({
                title: "Đang nghe...",
                description: "Hãy nói nội dung bạn muốn dịch",
            })
        }

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript
            setSourceText(transcript)
            setIsRecording(false)
        }

        recognition.onerror = () => {
            setIsRecording(false)
            toast({
                title: "Lỗi",
                description: "Không thể nhận dạng giọng nói",
                variant: "destructive",
            })
        }

        recognition.onend = () => {
            setIsRecording(false)
        }

        recognition.start()
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
            title: "Đã sao chép",
            description: "Nội dung đã được sao chép",
        })
    }

    const saveWord = () => {
        if (!sourceText || !translatedText) return

        const newWord: SavedWord = {
            id: Date.now().toString(),
            original: sourceText,
            translation: translatedText,
            fromLang: sourceLang,
            toLang: targetLang,
            examples,
            savedAt: new Date(),
            isFavorite: false,
        }

        const updated = [newWord, ...savedWords]
        setSavedWords(updated)
        localStorage.setItem("saved-words", JSON.stringify(updated))

        toast({
            title: "Đã lưu",
            description: "Từ đã được thêm vào sổ từ vựng",
        })
    }

    const toggleFavorite = (id: string) => {
        const updated = savedWords.map((w) => (w.id === id ? { ...w, isFavorite: !w.isFavorite } : w))
        setSavedWords(updated)
        localStorage.setItem("saved-words", JSON.stringify(updated))
    }

    const deleteWord = (id: string) => {
        const updated = savedWords.filter((w) => w.id !== id)
        setSavedWords(updated)
        localStorage.setItem("saved-words", JSON.stringify(updated))

        toast({
            title: "Đã xóa",
            description: "Từ đã được xóa khỏi sổ từ vựng",
        })
    }

    const clearHistory = () => {
        setHistory([])
        localStorage.removeItem("translation-history")
        toast({
            title: "Đã xóa",
            description: "Lịch sử đã được xóa",
        })
    }

    const exportSavedWords = () => {
        const dataStr = JSON.stringify(savedWords, null, 2)
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `vocabulary-${Date.now()}.json`
        link.click()

        toast({
            title: "Đã xuất file",
            description: "Sổ từ vựng đã được tải xuống",
        })
    }

    const charCount = sourceText.length
    const filteredSavedWords = savedWords.filter(
        (w) =>
            w.original.toLowerCase().includes(searchQuery.toLowerCase()) ||
            w.translation.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="min-h-screen">
            <div className="sticky top-0 z-10 backdrop-blur-xl bg-background/80  shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-end! my-4">


                        <div className="hidden md:flex items-center gap-4">
                            <Badge variant="secondary" className="gap-2">
                                <BookOpen className="w-4 h-4" />
                                {savedWords.length} từ
                            </Badge>
                            <Badge variant="secondary" className="gap-2">
                                <Clock className="w-4 h-4" />
                                {history.length} lịch sử
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="space-y-6">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-12">
                        <TabsTrigger value="translate" className="gap-2">
                            <Languages className="w-4 h-4" />
                            Dịch
                        </TabsTrigger>
                        <TabsTrigger value="history" className="gap-2">
                            <Clock className="w-4 h-4" />
                            Lịch sử
                        </TabsTrigger>
                        <TabsTrigger value="saved" className="gap-2">
                            <BookOpen className="w-4 h-4" />
                            Từ vựng
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="translate" className="space-y-6">
                        {/* Language Selector */}
                        <Card className="border-2">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between gap-4">
                                    <Select value={sourceLang} onValueChange={setSourceLang}>
                                        <SelectTrigger className="w-full h-12 text-lg font-medium">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {LANGUAGES.map((lang) => (
                                                <SelectItem key={lang.code} value={lang.code} className="text-lg">
                                                    <span className="flex items-center gap-2">
                                                        <span>{lang.flag}</span>
                                                        <span>{lang.name}</span>
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={swapLanguages}
                                        className="shrink-0 w-12 h-12 rounded-xl hover:rotate-180 transition-transform duration-300 bg-transparent"
                                    >
                                        <ArrowLeftRight className="w-5 h-5" />
                                    </Button>

                                    <Select value={targetLang} onValueChange={setTargetLang}>
                                        <SelectTrigger className="w-full h-12 text-lg font-medium">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {LANGUAGES.map((lang) => (
                                                <SelectItem key={lang.code} value={lang.code} className="text-lg">
                                                    <span className="flex items-center gap-2">
                                                        <span>{lang.flag}</span>
                                                        <span>{lang.name}</span>
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Source Panel */}
                            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-5 h-5 text-blue-500" />
                                            <CardTitle className="text-lg">Văn bản gốc</CardTitle>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={startRecording}
                                                disabled={isRecording}
                                                className={isRecording ? "text-red-500 animate-pulse" : ""}
                                            >
                                                <Mic className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => speakText(sourceText, sourceLang)}
                                                disabled={!sourceText.trim()}
                                            >
                                                <Volume2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Textarea
                                        ref={textareaRef}
                                        placeholder="Nhập văn bản, dán nội dung, hoặc nhấn mic để nói..."
                                        value={sourceText}
                                        onChange={(e) => setSourceText(e.target.value)}
                                        className="min-h-[320px] resize-none text-lg leading-relaxed border-0 focus-visible:ring-0"
                                    />
                                    <div className="flex items-center justify-between pt-2 border-t">
                                        <span className="text-sm text-muted-foreground">{charCount} / 5000 ký tự</span>
                                        {sourceText && (
                                            <Button variant="ghost" size="sm" onClick={() => setSourceText("")}>
                                                <X className="w-4 h-4 mr-1" />
                                                Xóa
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Translation Panel */}
                            <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-teal-500" />
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-cyan-500" />
                                            <CardTitle className="text-lg">Bản dịch</CardTitle>
                                        </div>
                                        <div className="flex gap-2">
                                            {translatedText && (
                                                <>
                                                    <Button size="sm" variant="ghost" onClick={() => speakText(translatedText, targetLang)}>
                                                        <Volume2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(translatedText)}>
                                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                    </Button>
                                                    <Button size="sm" variant="ghost" onClick={saveWord}>
                                                        <Save className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {translatedText ? (
                                        <div className="min-h-[320px] p-4 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg">
                                            <p className="text-lg leading-relaxed whitespace-pre-wrap">{translatedText}</p>
                                        </div>
                                    ) : (
                                        <div className="min-h-[320px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
                                            <div className="text-center space-y-3 p-6">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto">
                                                    <Languages className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-medium mb-1">Bản dịch sẽ hiển thị tại đây</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Nhập văn bản để dịch tự động hoặc nhấn nút Dịch
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {isTranslating && (
                                        <div className="flex items-center justify-center pt-2">
                                            <Sparkles className="w-4 h-4 animate-spin text-cyan-500 mr-2" />
                                            <span className="text-sm text-muted-foreground">Đang dịch...</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                onClick={() => handleTranslate(false)}
                                disabled={isTranslating || !sourceText.trim()}
                                size="lg"
                                className="min-w-[240px] h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                            >
                                {isTranslating ? (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                                        Đang dịch...
                                    </>
                                ) : (
                                    <>
                                        <Languages className="w-5 h-5 mr-2" />
                                        Dịch ngay
                                    </>
                                )}
                            </Button>
                        </div>

                        {alternatives.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                                        Các cách dịch khác
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {alternatives.map((alt, i) => (
                                            <Button
                                                key={i}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setTranslatedText(alt.text)}
                                                className="gap-2"
                                            >
                                                {alt.text}
                                                <Badge variant="secondary" className="text-xs">
                                                    {Math.round(alt.confidence * 100)}%
                                                </Badge>
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Examples Section */}
                        {examples.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-blue-500" />
                                        Ví dụ sử dụng trong câu
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {examples.map((example, i) => (
                                            <div key={i} className="p-4 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg border">
                                                <p className="text-sm leading-relaxed">{example}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Lịch sử dịch</CardTitle>
                                        <CardDescription>{history.length} bản dịch gần đây</CardDescription>
                                    </div>
                                    {history.length > 0 && (
                                        <Button variant="outline" size="sm" onClick={clearHistory}>
                                            <X className="w-4 h-4 mr-2" />
                                            Xóa tất cả
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {history.length > 0 ? (
                                    <ScrollArea className="h-[600px] pr-4">
                                        <div className="space-y-3">
                                            {history.map((item) => (
                                                <Card
                                                    key={item.id}
                                                    className="hover:shadow-md transition-shadow cursor-pointer"
                                                    onClick={() => {
                                                        setSourceText(item.original)
                                                        setTranslatedText(item.translation)
                                                        setSourceLang(item.fromLang)
                                                        setTargetLang(item.toLang)
                                                        setActiveTab("translate")
                                                    }}
                                                >
                                                    <CardContent className="pt-4">
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                <Badge variant="secondary">
                                                                    {LANGUAGES.find((l) => l.code === item.fromLang)?.flag}
                                                                </Badge>
                                                                <ArrowLeftRight className="w-3 h-3" />
                                                                <Badge variant="secondary">{LANGUAGES.find((l) => l.code === item.toLang)?.flag}</Badge>
                                                                <span className="ml-auto">{new Date(item.timestamp).toLocaleString("vi-VN")}</span>
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <p className="font-medium line-clamp-2">{item.original}</p>
                                                                <p className="text-sm text-muted-foreground line-clamp-2">{item.translation}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                                            <Clock className="w-10 h-10 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">Chưa có lịch sử</h3>
                                        <p className="text-sm text-muted-foreground max-w-sm">
                                            Lịch sử dịch của bạn sẽ được lưu tự động ở đây
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="saved" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <CardTitle>Sổ từ vựng</CardTitle>
                                        <CardDescription>{savedWords.length} từ đã lưu</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        {savedWords.length > 0 && (
                                            <Button variant="outline" size="sm" onClick={exportSavedWords}>
                                                <Download className="w-4 h-4 mr-2" />
                                                Xuất file
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                {savedWords.length > 0 && (
                                    <div className="pt-4">
                                        <Input
                                            placeholder="Tìm từ vựng..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="max-w-md"
                                        />
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent>
                                {filteredSavedWords.length > 0 ? (
                                    <ScrollArea className="h-[600px] pr-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {filteredSavedWords.map((word) => (
                                                <Card key={word.id} className="hover:shadow-md transition-shadow">
                                                    <CardContent className="pt-4">
                                                        <div className="space-y-3">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            {LANGUAGES.find((l) => l.code === word.fromLang)?.flag}
                                                                        </Badge>
                                                                        <ArrowLeftRight className="w-3 h-3" />
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            {LANGUAGES.find((l) => l.code === word.toLang)?.flag}
                                                                        </Badge>
                                                                    </div>
                                                                    <p className="font-semibold text-lg mb-1 truncate">{word.original}</p>
                                                                    <p className="text-sm text-muted-foreground mb-3 truncate">{word.translation}</p>
                                                                </div>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => toggleFavorite(word.id)}
                                                                    className="shrink-0"
                                                                >
                                                                    <Star
                                                                        className={`w-4 h-4 ${word.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`}
                                                                    />
                                                                </Button>
                                                            </div>

                                                            {word.examples.length > 0 && (
                                                                <div className="space-y-1">
                                                                    {word.examples.slice(0, 1).map((example, i) => (
                                                                        <p key={i} className="text-xs text-muted-foreground pl-3 border-l-2 line-clamp-2">
                                                                            {example}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            <div className="flex items-center justify-between pt-2 border-t">
                                                                <div className="flex gap-1">
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        onClick={() => speakText(word.original, word.fromLang)}
                                                                    >
                                                                        <Volume2 className="w-3 h-3" />
                                                                    </Button>
                                                                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard(word.original)}>
                                                                        <Copy className="w-3 h-3" />
                                                                    </Button>
                                                                </div>
                                                                <Button size="sm" variant="ghost" onClick={() => deleteWord(word.id)}>
                                                                    <X className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                                            <BookOpen className="w-10 h-10 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{searchQuery ? "Không tìm thấy" : "Chưa có từ nào"}</h3>
                                        <p className="text-sm text-muted-foreground max-w-sm">
                                            {searchQuery
                                                ? "Thử tìm kiếm với từ khóa khác"
                                                : "Dịch và lưu các từ mới để xây dựng sổ từ vựng của bạn"}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
