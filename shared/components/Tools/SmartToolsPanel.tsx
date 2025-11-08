"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Badge } from "@/shared/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { Loader2, FileText, BookOpen, Languages, Sparkles, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SmartToolsPanel() {
    const [inputText, setInputText] = useState("")
    const [summaryResult, setSummaryResult] = useState("")
    const [translationResult, setTranslationResult] = useState("")
    const [explanationResult, setExplanationResult] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [summaryLevel, setSummaryLevel] = useState<"short" | "medium" | "detailed">("medium")
    const [targetLang, setTargetLang] = useState<"en" | "vi">("en")
    const [copied, setCopied] = useState(false)
    const { toast } = useToast()

    const handleSummarize = async () => {
        if (!inputText.trim()) {
            toast({
                title: "Vui lòng nhập văn bản",
                description: "Nhập hoặc dán nội dung cần tóm tắt",
                variant: "destructive",
            })
            return
        }

        setIsProcessing(true)
        try {
            const response = await fetch("/api/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText, level: summaryLevel }),
            })

            const data = await response.json()
            setSummaryResult(data.summary)

            toast({
                title: "Tóm tắt thành công",
                description: "Nội dung đã được AI tóm tắt",
            })
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể tóm tắt văn bản",
                variant: "destructive",
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleTranslate = async () => {
        if (!inputText.trim()) {
            toast({
                title: "Vui lòng nhập văn bản",
                description: "Nhập hoặc dán nội dung cần dịch",
                variant: "destructive",
            })
            return
        }

        setIsProcessing(true)
        try {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText, targetLang }),
            })

            const data = await response.json()
            setTranslationResult(data.translation)

            toast({
                title: "Dịch thành công",
                description: `Đã dịch sang ${targetLang === "en" ? "tiếng Anh" : "tiếng Việt"}`,
            })
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể dịch văn bản",
                variant: "destructive",
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleExplain = async () => {
        if (!inputText.trim()) {
            toast({
                title: "Vui lòng nhập văn bản",
                description: "Nhập từ hoặc câu cần giải thích",
                variant: "destructive",
            })
            return
        }

        setIsProcessing(true)
        try {
            const response = await fetch("/api/explain", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputText }),
            })

            const data = await response.json()
            setExplanationResult(data.explanation)

            toast({
                title: "Giải thích thành công",
                description: "AI đã giải thích nội dung",
            })
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể giải thích văn bản",
                variant: "destructive",
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
            title: "Đã sao chép",
            description: "Nội dung đã được sao chép vào clipboard",
        })
    }

    return (
        <Card className="h-full flex flex-col backdrop-blur-sm bg-card/95 border-2">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <CardTitle>Công cụ thông minh</CardTitle>
                        <CardDescription>Hỗ trợ học tập bằng AI</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-4">
                <Tabs defaultValue="summarize" className="h-full flex flex-col">
                    <TabsList className="grid w-full grid-cols-3 mb-3">
                        <TabsTrigger value="summarize" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            Tóm tắt
                        </TabsTrigger>
                        <TabsTrigger value="translate" className="text-xs">
                            <Languages className="w-3 h-3 mr-1" />
                            Dịch
                        </TabsTrigger>
                        <TabsTrigger value="explain" className="text-xs">
                            <BookOpen className="w-3 h-3 mr-1" />
                            Giải thích
                        </TabsTrigger>
                    </TabsList>

                    <ScrollArea className="flex-1">
                        {/* Summarize Tab */}
                        <TabsContent value="summarize" className="mt-0 space-y-3">
                            <div className="space-y-2">
                                <Label>Văn bản cần tóm tắt</Label>
                                <Textarea
                                    placeholder="Dán hoặc nhập nội dung bài học cần tóm tắt..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="min-h-[120px] resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Độ chi tiết</Label>
                                <Select value={summaryLevel} onValueChange={(v: any) => setSummaryLevel(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="short">Ngắn gọn</SelectItem>
                                        <SelectItem value="medium">Trung bình</SelectItem>
                                        <SelectItem value="detailed">Chi tiết</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button onClick={handleSummarize} disabled={isProcessing || !inputText.trim()} className="w-full">
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Tóm tắt ngay
                                    </>
                                )}
                            </Button>

                            {summaryResult && (
                                <Card className="bg-muted/50">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm">Kết quả tóm tắt</CardTitle>
                                            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(summaryResult)}>
                                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm leading-relaxed">{summaryResult}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Translate Tab */}
                        <TabsContent value="translate" className="mt-0 space-y-3">
                            <div className="space-y-2">
                                <Label>Văn bản gốc</Label>
                                <Textarea
                                    placeholder="Nhập văn bản cần dịch..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="min-h-[120px] resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Dịch sang</Label>
                                <Select value={targetLang} onValueChange={(v: any) => setTargetLang(v)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">Tiếng Anh</SelectItem>
                                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button onClick={handleTranslate} disabled={isProcessing || !inputText.trim()} className="w-full">
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Đang dịch...
                                    </>
                                ) : (
                                    <>
                                        <Languages className="w-4 h-4 mr-2" />
                                        Dịch ngay
                                    </>
                                )}
                            </Button>

                            {translationResult && (
                                <Card className="bg-muted/50">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm">Kết quả dịch</CardTitle>
                                            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(translationResult)}>
                                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm leading-relaxed">{translationResult}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* Explain Tab */}
                        <TabsContent value="explain" className="mt-0 space-y-3">
                            <div className="space-y-2">
                                <Label>Từ hoặc câu cần giải thích</Label>
                                <Textarea
                                    placeholder="Nhập từ vựng hoặc câu khó hiểu..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="min-h-[120px] resize-none"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Badge variant="secondary" className="text-xs">
                                    Giải nghĩa
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    Ví dụ
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    Dễ hiểu
                                </Badge>
                            </div>

                            <Button onClick={handleExplain} disabled={isProcessing || !inputText.trim()} className="w-full">
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Đang giải thích...
                                    </>
                                ) : (
                                    <>
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        Giải thích ngay
                                    </>
                                )}
                            </Button>

                            {explanationResult && (
                                <Card className="bg-muted/50">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm">Giải thích</CardTitle>
                                            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(explanationResult)}>
                                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{explanationResult}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </ScrollArea>
                </Tabs>
            </CardContent>
        </Card>
    )
}
