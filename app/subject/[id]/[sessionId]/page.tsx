"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { Textarea } from "@/shared/ui/textarea"
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
  Video,
  Headphones,
  Lock,
} from "lucide-react"
import StudentChat from "@/features/main/components/Translator/components/StudentChat"
import { getLessonById, Lesson as ApiLesson } from "@/apis/lessonApi"
import { speak, stopSpeech } from "@/shared/lib/text-to-speech"
import SuggestAI from "./components/SuggestAI"
import HelpChat from "./components/Tabs/HelpChat"

interface PageProps {
  params: Promise<{ id: string; sessionId: string }> | { id: string; sessionId: string }
}

interface LessonMaterial {
  id: string
  title: string
  type: string
  url?: string
  size?: string
  downloadable: boolean
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function LessonDetailPage({ params }: PageProps) {
  const [subjectId, setSubjectId] = useState<string>("")
  const [sessionId, setSessionId] = useState<string>("")
  const [lesson, setLesson] = useState<ApiLesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatMode, setChatMode] = useState<"simple" | "full">("simple")
  const [isSendingChat, setIsSendingChat] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  // const resolvedParams = await params;
  // const session = mockSessions[Math.floor(Math.random() * mockSessions.length)];

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setSubjectId(resolved.id)
      setSessionId(resolved.sessionId)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (sessionId) {
      loadLessonData()
    }
  }, [sessionId])

  const loadLessonData = async () => {
    setLoading(true)
    try {
      const apiLesson = await getLessonById(sessionId)
      setLesson(apiLesson)

      // Set first material as selected
      if (apiLesson.resources && apiLesson.resources.length > 0) {
        setSelectedMaterial(apiLesson.resources[0]._id)
      }
    } catch (error) {
      console.error("Error loading lesson:", error)
    } finally {
      setLoading(false)
    }
  }

  // Transform resources to materials
  const materials: LessonMaterial[] = lesson?.resources.map((resource, idx) => {
    const downloadable = resource.type !== "video" && resource.type !== "audio"

    return {
      id: resource._id || `material-${idx}`,
      title: resource.type === "video"
        ? "Video bài giảng"
        : resource.type === "audio"
          ? "Audio giải thích"
          : resource.type === "document"
            ? "Tài liệu học tập"
            : "Tài liệu",
      type: resource.type,
      url: resource.url,
      downloadable,
    }
  }) || []

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getLessonType = (): string => {
    if (!lesson?.resources || lesson.resources.length === 0) return "text"

    const hasVideo = lesson.resources.some(r => r.type === "video")
    if (hasVideo) return "video"

    const hasAudio = lesson.resources.some(r => r.type === "audio")
    if (hasAudio) return "audio"

    const hasDocument = lesson.resources.some(r => r.type === "document")
    if (hasDocument) return "document"

    return "text"
  }

  const handleReadContent = () => {
    if (isSpeaking) {
      stopSpeech()
      setIsSpeaking(false)
    } else if (lesson?.description) {
      speak(
        lesson.description,
        "vi-VN",
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      )
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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: chatInput,
          mode: chatMode,
          context: {
            lessonId: lesson?._id,
            lessonTitle: lesson?.title || lesson?.name,
            lessonDescription: lesson?.description,
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
    } catch (error) {
      console.error("Error sending chat:", error)
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

  const handleCompleteLesson = async () => {
    if (!lesson) return

    try {
      // Update lesson completion status
      await fetch(`/api/lessons/${lesson._id}/complete`, {
        method: "POST",
      })
      // Note: In a real app, you'd update the lesson state here
    } catch (error) {
      console.error("Error completing lesson:", error)
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
          <Link href={`/subject/${subjectId}`}>
            <Button className="mt-4">Quay lại môn học</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const lessonType = getLessonType()
  const lessonTitle = lesson.title || lesson.name || "Bài học không có tiêu đề"
  const currentMaterial = materials.find((m) => m.id === selectedMaterial)

  return (
    <div className="">
      <div className=" p-10 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href={`/subject/${subjectId}`}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại môn học
            </Button>
          </Link>

          {!lesson.status && (
            <Button onClick={handleCompleteLesson} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Đánh dấu hoàn thành
            </Button>
          )}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{lessonTitle}</CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </div>
                  {lesson.status && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Đã hoàn thành
                    </Badge>
                  )}
                </div>
              </CardHeader>
            </Card>

            {materials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tài liệu học tập</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedMaterial || undefined} onValueChange={setSelectedMaterial}>
                    <TabsList className="w-full justify-start overflow-x-auto">
                      {materials.map((material) => (
                        <TabsTrigger key={material.id} value={material.id} className="gap-2">
                          {getTypeIcon(material.type)}
                          {material.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {materials.map((material) => (
                      <TabsContent key={material.id} value={material.id} className="mt-4">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          {material.type === "video" ? (
                            <video
                              controls
                              className="w-full h-full object-cover"
                              src={material.url}
                            />
                          ) : material.type === "audio" ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center">
                                <Headphones className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <audio controls className="w-full max-w-md">
                                  <source src={material.url} />
                                </audio>
                                <p className="font-medium mt-4">{material.title}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center">
                                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <p className="font-medium mb-2">{material.title}</p>
                                {material.size && (
                                  <p className="text-sm text-muted-foreground mb-4">{material.size}</p>
                                )}
                                {material.downloadable && material.url && (
                                  <Button variant="outline" className="gap-2 bg-transparent" asChild>
                                    <a href={material.url} download>
                                      <Download className="h-4 w-4" />
                                      Tải xuống
                                    </a>
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
            )}

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
                {/* <ScrollArea className="h-[600px] pr-4">
                                    <div
                                        className="prose dark:prose-invert max-w-none"
                                        style={{
                                            fontSize: `${settings.fontSize === "small" ? "0.875" : settings.fontSize === "large" ? "1.125" : settings.fontSize === "xlarge" ? "1.25" : "1"}rem`,
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: lesson.content.replace(/\n/g, "<br>"),
                                        }}
                                    />
                                </ScrollArea> */}
              </CardContent>
            </Card>


          </div>
          <div className="sticky top-6">
            <div className=" overflow-hidden">
              <StudentChat
                sessionId={sessionId}
                key={sessionId}
              />
            </div>
          </div>



        </div>
        <HelpChat sessionId={sessionId || ""} />
        <SuggestAI sessionId={sessionId || ""} />
      </div>

    </div>
  )
}
