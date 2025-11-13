"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import { Badge } from "@/shared/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { useAccessibility } from "@/shared/lib/accessibility-context"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"
import Link from "next/link"
import {
    ArrowLeft,
    Volume2,
    VolumeX,
    MessageSquare,
    Download,
    CheckCircle,
    BookOpen,
    Mic,
    Play,
    FileText,
    Lightbulb,
    Languages,
    FileQuestion,
    ChevronRight,
    Sparkles,
    BookMarked,
    PenTool,
    RefreshCw,
    ExternalLink,
    CheckSquare,
    Edit3,
} from "lucide-react"
import type { Lesson as ApiLesson } from "@/apis/lessonApi"
import { SessionMessage as ApiSessionMessage, SessionMessage } from "@/apis/sessionMessage"

interface RelatedLesson {
    id: string
    title: string
    description: string
    reason: string
    difficulty: "easier" | "same" | "harder"
}

interface PracticeExercise {
    id: string
    type: "multiple_choice" | "fill_blank" | "essay" | "matching"
    question: string
    options?: string[]
    answer?: string
    explanation?: string
}

interface AISuggestions {
    relatedLessons: RelatedLesson[]
    practiceExercises: PracticeExercise[]
}

interface LessonViewerProps {
    lessonId: string
}

export default function LessonViewer({ lessonId }: LessonViewerProps) {
    const { settings } = useAccessibility()
    const { speak, stop, isSpeaking } = useTextToSpeech()

    const [lesson, setLesson] = useState<| null>(null)
    const [loading, setLoading] = useState(true)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [chatInput, setChatInput] = useState("")
    const [chatMode, setChatMode] = useState<"simple" | "full">("simple")
    const [isRecording, setIsRecording] = useState(false)
    const [isSendingChat, setIsSendingChat] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)

    const [aiSuggestions, setAiSuggestions] = useState<AISuggestions | null>(null)
    const [loadingSuggestions, setLoadingSuggestions] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})

    useEffect(() => {
        loadLessonData()
    }, [lessonId])

    const loadLessonData = async () => {
        setLoading(true)
        try {
            // Mock data - Replace with: GET /api/lessons/:id
            const mockLesson: SessionMessage = {
                id: lessonId,
                subjectId: "1",
                title: "Bài 1: Giới thiệu về số tự nhiên",
                description: "Tìm hiểu khái niệm số tự nhiên, các phép toán cơ bản",
                order: 1,
                duration: 45,
                type: "video",
                content: `# Số tự nhiên

## 1. Định nghĩa
Số tự nhiên là các số đếm bắt đầu từ 0: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...

## 2. Tập hợp số tự nhiên
Tập hợp số tự nhiên được ký hiệu là **N** (từ tiếng Anh: Natural numbers)

N = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...}

## 3. Các phép toán cơ bản

### Phép cộng
Phép cộng là phép tính gộp hai số lại với nhau.
Ví dụ: 2 + 3 = 5

### Phép trừ
Phép trừ là phép tính lấy đi một phần từ tổng.
Ví dụ: 5 - 3 = 2

## 4. Bài tập thực hành
1. Tính: 7 + 5 = ?
2. Tính: 10 - 4 = ?
3. Điền số thích hợp: 3 + ? = 8
`,
                materials: [
                    {
                        id: "m1",
                        title: "Video bài giảng",
                        type: "video",
                        url: "/math-classroom-teacher-students.jpg",
                        downloadable: false,
                    },
                    {
                        id: "m2",
                        title: "Slide bài giảng",
                        type: "pdf",
                        url: "/pdfs/lesson1.pdf",
                        size: "2.5 MB",
                        downloadable: true,
                    },
                    {
                        id: "m3",
                        title: "Bài tập thực hành",
                        type: "pdf",
                        url: "/pdfs/exercise1.pdf",
                        size: "1.2 MB",
                        downloadable: true,
                    },
                ],
                isCompleted: false,
                createdAt: new Date("2024-01-15"),
            }

            setLesson(mockLesson)
            if (mockLesson.materials.length > 0) {
                setSelectedMaterial(mockLesson.materials[0].id)
            }
        } catch (error) {
            console.error("[v0] Error loading lesson:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchAISuggestions = async () => {
        if (!lesson) return

        setLoadingSuggestions(true)
        setShowSuggestions(true)

        try {
            const response = await fetch("/api/lessons/suggestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    lessonContent: lesson.content,
                    subjectId: lesson.subjectId,
                }),
            })

            const data = await response.json()
            setAiSuggestions(data)
        } catch (error) {
            console.error("[v0] Error fetching AI suggestions:", error)
        } finally {
            setLoadingSuggestions(false)
        }
    }

    const checkAnswer = (exerciseId: string, userAnswer: string) => {
        const exercise = aiSuggestions?.practiceExercises.find((ex) => ex.id === exerciseId)
        if (!exercise) return false

        return userAnswer.trim().toLowerCase() === exercise.answer?.toLowerCase()
    }

    const handleReadContent = () => {
        if (isSpeaking) {
            stop()
        } else if (lesson) {
            speak(lesson.content, settings.language)
        }
    }

    const handleSendChat = async () => {
        if (!chatInput.trim() || isSendingChat) return

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: chatInput,
            timestamp: new Date(),
        }

        setChatMessages((prev) => [...prev, userMessage])
        setChatInput("")
        setIsSendingChat(true)

        try {
            // Call chatbot API with lesson context
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: chatInput,
                    mode: chatMode,
                    context: {
                        lessonId: lesson?.id,
                        lessonTitle: lesson?.title,
                        lessonContent: lesson?.content,
                    },
                }),
            })

            const data = await response.json()

            const aiMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply_text || data.text || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
                timestamp: new Date(),
            }

            setChatMessages((prev) => [...prev, aiMessage])

            // Save to chat history
            await saveChatHistory(userMessage.content, aiMessage.content)
        } catch (error) {
            console.error("[v0] Error sending chat:", error)
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.",
                timestamp: new Date(),
            }
            setChatMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsSendingChat(false)
        }
    }

    const saveChatHistory = async (question: string, answer: string) => {
        try {
            await fetch("/api/chat-history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    lessonId: lesson?.id,
                    subjectId: lesson?.subjectId,
                    question,
                    answer,
                    mode: chatMode,
                }),
            })
        } catch (error) {
            console.error("[v0] Error saving chat history:", error)
        }
    }

    const handleVoiceInput = async () => {
        if (isRecording) {
            setIsRecording(false)
            // Stop recording and convert to text via STT API
        } else {
            setIsRecording(true)
            // Start recording
        }
    }

    const handleCompleteLesson = async () => {
        if (!lesson) return

        try {
            // Update lesson completion status
            await fetch(`/api/lessons/${lesson.id}/complete`, {
                method: "POST",
            })

            setLesson({ ...lesson, isCompleted: true, completedAt: new Date() })
        } catch (error) {
            console.error("[v0] Error completing lesson:", error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
                    <p className="mt-2 text-muted-foreground">Đang tải bài học...</p>
                </div>
            </div>
        )
    }

    if (!lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h3 className="text-lg font-semibold">Không tìm thấy bài học</h3>
                    <Link href="/student">
                        <Button className="mt-4">Quay lại trang chủ</Button>
                    </Link>
                </Card>
            </div>
        )
    }

    const currentMaterial = lesson.materials.find((m) => m.id === selectedMaterial)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto p-4 lg:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <Link href={`/subject/${lesson.subjectId}`}>
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Quay lại môn học
                        </Button>
                    </Link>

                    {!lesson.isCompleted && (
                        <Button onClick={handleCompleteLesson} className="gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Đánh dấu hoàn thành
                        </Button>
                    )}
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Content & Materials */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Lesson Header */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <CardTitle className="text-2xl mb-2">{lesson.title}</CardTitle>
                                        <CardDescription>{lesson.description}</CardDescription>
                                    </div>
                                    {lesson.isCompleted && (
                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                            Đã hoàn thành
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Materials Tabs */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Tài liệu học tập</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs value={selectedMaterial || undefined} onValueChange={setSelectedMaterial}>
                                    <TabsList className="w-full justify-start overflow-x-auto">
                                        {lesson.materials.map((material) => (
                                            <TabsTrigger key={material.id} value={material.id} className="gap-2">
                                                {material.type === "video" && <Play className="h-4 w-4" />}
                                                {material.type === "pdf" && <FileText className="h-4 w-4" />}
                                                {material.title}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    {lesson.materials.map((material) => (
                                        <TabsContent key={material.id} value={material.id} className="mt-4">
                                            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                                {material.type === "video" ? (
                                                    <img
                                                        src={material.url || "/placeholder.svg"}
                                                        alt={material.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="text-center">
                                                            <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                                            <p className="font-medium mb-2">{material.title}</p>
                                                            {material.size && <p className="text-sm text-muted-foreground mb-4">{material.size}</p>}
                                                            {material.downloadable && (
                                                                <Button variant="outline" className="gap-2 bg-transparent">
                                                                    <Download className="h-4 w-4" />
                                                                    Tải xuống
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Lesson Content */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" />
                                        Nội dung bài học
                                    </CardTitle>
                                    <Button variant="outline" size="sm" onClick={handleReadContent} className="gap-2 bg-transparent">
                                        {isSpeaking ? (
                                            <>
                                                <VolumeX className="h-4 w-4" />
                                                Dừng đọc
                                            </>
                                        ) : (
                                            <>
                                                <Volume2 className="h-4 w-4" />
                                                Đọc nội dung
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[600px] pr-4">
                                    <div
                                        className="prose dark:prose-invert max-w-none"
                                        style={{
                                            fontSize: `${settings.fontSize === "small" ? "0.875" : settings.fontSize === "large" ? "1.125" : settings.fontSize === "xlarge" ? "1.25" : "1"}rem`,
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: lesson.content.replace(/\n/g, "<br>"),
                                        }}
                                    />
                                </ScrollArea>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                            <Sparkles className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">Gợi ý từ AI</CardTitle>
                                            <CardDescription>Bài học liên quan và bài tập thực hành</CardDescription>
                                        </div>
                                    </div>
                                    {!showSuggestions ? (
                                        <Button onClick={fetchAISuggestions} className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500">
                                            <Sparkles className="h-4 w-4" />
                                            Xem gợi ý
                                        </Button>
                                    ) : (
                                        <Button variant="outline" onClick={fetchAISuggestions} className="gap-2 bg-transparent">
                                            <RefreshCw className={`h-4 w-4 ${loadingSuggestions ? "animate-spin" : ""}`} />
                                            Làm mới
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>

                            {showSuggestions && (
                                <CardContent>
                                    {loadingSuggestions ? (
                                        <div className="text-center py-12">
                                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent" />
                                            <p className="mt-4 text-muted-foreground">AI đang phân tích bài học...</p>
                                        </div>
                                    ) : aiSuggestions ? (
                                        <Tabs defaultValue="related" className="w-full">
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="related" className="gap-2">
                                                    <BookMarked className="h-4 w-4" />
                                                    Bài học liên quan
                                                </TabsTrigger>
                                                <TabsTrigger value="practice" className="gap-2">
                                                    <PenTool className="h-4 w-4" />
                                                    Bài tập thực hành
                                                </TabsTrigger>
                                            </TabsList>

                                            {/* Related Lessons Tab */}
                                            <TabsContent value="related" className="space-y-4 mt-4">
                                                {aiSuggestions.relatedLessons.length === 0 ? (
                                                    <p className="text-center text-muted-foreground py-8">Chưa có bài học liên quan</p>
                                                ) : (
                                                    aiSuggestions.relatedLessons.map((relatedLesson) => (
                                                        <Card key={relatedLesson.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                                                            <CardHeader>
                                                                <div className="flex items-start justify-between gap-4">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <CardTitle className="text-base">{relatedLesson.title}</CardTitle>
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={
                                                                                    relatedLesson.difficulty === "easier"
                                                                                        ? "border-green-500 text-green-700"
                                                                                        : relatedLesson.difficulty === "harder"
                                                                                            ? "border-red-500 text-red-700"
                                                                                            : "border-blue-500 text-blue-700"
                                                                                }
                                                                            >
                                                                                {relatedLesson.difficulty === "easier"
                                                                                    ? "Dễ hơn"
                                                                                    : relatedLesson.difficulty === "harder"
                                                                                        ? "Khó hơn"
                                                                                        : "Cùng mức"}
                                                                            </Badge>
                                                                        </div>
                                                                        <CardDescription className="mb-2">{relatedLesson.description}</CardDescription>
                                                                        <p className="text-sm text-muted-foreground flex items-start gap-2">
                                                                            <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                                            <span>{relatedLesson.reason}</span>
                                                                        </p>
                                                                    </div>
                                                                    <Link href={`/lesson/${relatedLesson.id}`}>
                                                                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                                                                            Xem
                                                                            <ExternalLink className="h-3 w-3" />
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                            </CardHeader>
                                                        </Card>
                                                    ))
                                                )}
                                            </TabsContent>

                                            {/* Practice Exercises Tab */}
                                            <TabsContent value="practice" className="space-y-4 mt-4">
                                                {aiSuggestions.practiceExercises.length === 0 ? (
                                                    <p className="text-center text-muted-foreground py-8">Chưa có bài tập thực hành</p>
                                                ) : (
                                                    aiSuggestions.practiceExercises.map((exercise, index) => (
                                                        <Card key={exercise.id} className="bg-white/50 dark:bg-gray-900/50">
                                                            <CardHeader>
                                                                <div className="flex items-start gap-3">
                                                                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                                                                        <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
                                                                            {index + 1}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <Badge variant="outline" className="mb-2">
                                                                            {exercise.type === "multiple_choice"
                                                                                ? "Trắc nghiệm"
                                                                                : exercise.type === "fill_blank"
                                                                                    ? "Điền vào chỗ trống"
                                                                                    : exercise.type === "essay"
                                                                                        ? "Tự luận"
                                                                                        : "Nối câu"}
                                                                        </Badge>
                                                                        <p className="font-medium mb-3">{exercise.question}</p>

                                                                        {exercise.type === "multiple_choice" && exercise.options && (
                                                                            <div className="space-y-2">
                                                                                {exercise.options.map((option, i) => (
                                                                                    <Button
                                                                                        key={i}
                                                                                        variant="outline"
                                                                                        className="w-full justify-start text-left h-auto py-3 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-950/50"
                                                                                        onClick={() => setUserAnswers({ ...userAnswers, [exercise.id]: option })}
                                                                                    >
                                                                                        <div className="flex items-center gap-3 w-full">
                                                                                            <div className="h-6 w-6 rounded-full border-2 border-purple-300 flex items-center justify-center flex-shrink-0">
                                                                                                {userAnswers[exercise.id] === option && (
                                                                                                    <div className="h-3 w-3 rounded-full bg-purple-500" />
                                                                                                )}
                                                                                            </div>
                                                                                            <span className="flex-1">{option}</span>
                                                                                        </div>
                                                                                    </Button>
                                                                                ))}
                                                                            </div>
                                                                        )}

                                                                        {exercise.type === "fill_blank" && (
                                                                            <div className="mt-2">
                                                                                <Textarea
                                                                                    placeholder="Nhập câu trả lời..."
                                                                                    value={userAnswers[exercise.id] || ""}
                                                                                    onChange={(e) =>
                                                                                        setUserAnswers({ ...userAnswers, [exercise.id]: e.target.value })
                                                                                    }
                                                                                    rows={2}
                                                                                />
                                                                            </div>
                                                                        )}

                                                                        {exercise.type === "essay" && (
                                                                            <div className="mt-2">
                                                                                <Textarea
                                                                                    placeholder="Viết câu trả lời của bạn..."
                                                                                    value={userAnswers[exercise.id] || ""}
                                                                                    onChange={(e) =>
                                                                                        setUserAnswers({ ...userAnswers, [exercise.id]: e.target.value })
                                                                                    }
                                                                                    rows={4}
                                                                                />
                                                                            </div>
                                                                        )}

                                                                        {userAnswers[exercise.id] && exercise.type !== "essay" && (
                                                                            <div className="mt-3">
                                                                                {checkAnswer(exercise.id, userAnswers[exercise.id]) ? (
                                                                                    <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                                                                                        <CheckSquare className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                                                        <div>
                                                                                            <p className="font-medium text-green-700 dark:text-green-400">
                                                                                                Chính xác!
                                                                                            </p>
                                                                                            {exercise.explanation && (
                                                                                                <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                                                                                                    {exercise.explanation}
                                                                                                </p>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                                                                                        <Edit3 className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                                                                        <div>
                                                                                            <p className="font-medium text-red-700 dark:text-red-400">
                                                                                                Chưa đúng, thử lại nhé!
                                                                                            </p>
                                                                                            {exercise.explanation && (
                                                                                                <p className="text-sm text-red-600 dark:text-red-500 mt-1">
                                                                                                    Gợi ý: {exercise.explanation}
                                                                                                </p>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}

                                                                        {userAnswers[exercise.id] && exercise.type === "essay" && (
                                                                            <div className="mt-3">
                                                                                <Button
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    className="gap-2 bg-transparent"
                                                                                    onClick={() => {
                                                                                        // Send to AI for evaluation
                                                                                        setChatInput(
                                                                                            `Đánh giá câu trả lời của tôi cho câu hỏi: "${exercise.question}"\n\nCâu trả lời: ${userAnswers[exercise.id]}`,
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    <MessageSquare className="h-4 w-4" />
                                                                                    Nhờ AI đánh giá
                                                                                </Button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </CardHeader>
                                                        </Card>
                                                    ))
                                                )}
                                            </TabsContent>
                                        </Tabs>
                                    ) : (
                                        <p className="text-center text-muted-foreground py-8">Không thể tải gợi ý. Vui lòng thử lại.</p>
                                    )}
                                </CardContent>
                            )}
                        </Card>
                    </div>

                    {/* Right Column: AI Assistant & Tools */}
                    <div className="space-y-6">
                        {/* AI Chat */}
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Trợ lý AI
                                </CardTitle>
                                <CardDescription>Hỏi bất kỳ câu hỏi nào về bài học</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Chat Mode */}
                                <div className="flex gap-2">
                                    <Button
                                        variant={chatMode === "simple" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setChatMode("simple")}
                                        className="flex-1"
                                    >
                                        Đơn giản
                                    </Button>
                                    <Button
                                        variant={chatMode === "full" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setChatMode("full")}
                                        className="flex-1"
                                    >
                                        Chi tiết
                                    </Button>
                                </div>

                                {/* Chat Messages */}
                                <ScrollArea className="h-[300px] border rounded-lg p-4">
                                    {chatMessages.length === 0 ? (
                                        <div className="text-center text-muted-foreground py-8">
                                            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p className="text-sm">Bắt đầu hỏi AI về bài học</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {chatMessages.map((msg) => (
                                                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                                    <div
                                                        className={`max-w-[85%] rounded-lg p-3 ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-muted"
                                                            }`}
                                                    >
                                                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                                        <p className="text-xs opacity-70 mt-1">
                                                            {msg.timestamp.toLocaleTimeString("vi-VN", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {isSendingChat && (
                                                <div className="flex justify-start">
                                                    <div className="bg-muted rounded-lg p-3">
                                                        <div className="flex gap-1">
                                                            <div
                                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                                style={{ animationDelay: "0ms" }}
                                                            />
                                                            <div
                                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                                style={{ animationDelay: "150ms" }}
                                                            />
                                                            <div
                                                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                                style={{ animationDelay: "300ms" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </ScrollArea>

                                {/* Chat Input */}
                                <div className="space-y-2">
                                    <Textarea
                                        placeholder="Nhập câu hỏi của bạn..."
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault()
                                                handleSendChat()
                                            }
                                        }}
                                        rows={3}
                                    />
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={handleVoiceInput} className="gap-2 bg-transparent">
                                            <Mic className={`h-4 w-4 ${isRecording ? "text-red-500 animate-pulse" : ""}`} />
                                            {isRecording ? "Đang ghi..." : "Ghi âm"}
                                        </Button>
                                        <Button
                                            onClick={handleSendChat}
                                            disabled={!chatInput.trim() || isSendingChat}
                                            className="flex-1 gap-2"
                                        >
                                            Gửi
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick AI Tools */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Công cụ AI nhanh</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="sm">
                                    <Lightbulb className="h-4 w-4" />
                                    Tóm tắt bài học
                                </Button>
                                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="sm">
                                    <Languages className="h-4 w-4" />
                                    Giải thích từ khó
                                </Button>
                                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="sm">
                                    <FileQuestion className="h-4 w-4" />
                                    Tạo câu hỏi ôn tập
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
