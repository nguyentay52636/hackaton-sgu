"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import { ScrollArea } from "@/shared/ui/scroll-area"
import type { ChatMessage, ChatMode } from "@/apis/types"
import { ChatMessageItem } from "./components/ChatMessageItem"
import { Send, Mic, StopCircle, Sparkles, Brain } from "lucide-react"
import { generateId } from "@/shared/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/shared/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"

export function ChatPanel() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Xin chào! Tôi là trợ lý AI hỗ trợ học tập. Bạn có thể hỏi tôi bất kỳ câu hỏi nào hoặc yêu cầu giải thích về bất kỳ chủ đề nào. Tôi sẽ cố gắng giải thích một cách đơn giản và dễ hiểu.",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [chatMode, setChatMode] = useState<ChatMode>("simple")
    const scrollRef = useRef<HTMLDivElement>(null)
    const { toast } = useToast()

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return

        const userMessage: ChatMessage = {
            id: generateId(),
            role: "user",
            content: text,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    mode: chatMode,
                    history: messages.slice(-5),
                }),
            })

            if (!response.ok) {
                throw new Error("Chat request failed")
            }

            const data = await response.json()

            const assistantMessage: ChatMessage = {
                id: generateId(),
                role: "assistant",
                content: data.reply,
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, assistantMessage])
        } catch (error) {
            console.error("Chat error:", error)
            toast({
                title: "Lỗi",
                description: "Không thể gửi tin nhắn. Vui lòng thử lại.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleVoiceInput = async () => {
        if (isRecording) {
            setIsRecording(false)
            return
        }

        setIsRecording(true)

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            const chunks: Blob[] = []

            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data)
            }

            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunks, { type: "audio/webm" })

                const formData = new FormData()
                formData.append("audio", blob)
                formData.append("language", "vi")

                const response = await fetch("/api/stt", {
                    method: "POST",
                    body: formData,
                })

                if (response.ok) {
                    const data = await response.json()
                    setInput(data.transcript)
                }

                stream.getTracks().forEach((track) => track.stop())
                setIsRecording(false)
            }

            mediaRecorder.start()

            setTimeout(() => {
                if (mediaRecorder.state === "recording") {
                    mediaRecorder.stop()
                }
            }, 30000)
        } catch (error) {
            console.error("Voice input error:", error)
            setIsRecording(false)
            toast({
                title: "Lỗi",
                description: "Không thể truy cập microphone",
                variant: "destructive",
            })
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage(input)
        }
    }

    return (
        <div className="flex flex-col h-full rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-gradient-to-r from-card to-accent/10">
                <div className="animate-slide-up">
                    <div className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold text-foreground">Trợ lý AI</h2>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium mt-0.5">Hỏi đáp và hỗ trợ học tập</p>
                </div>

                <Select value={chatMode} onValueChange={(value) => setChatMode(value as ChatMode)}>
                    <SelectTrigger
                        className="w-[180px] border-primary/20 hover:border-primary transition-colors"
                        aria-label="Chế độ chat"
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="animate-scale-in">
                        <SelectItem value="simple">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-accent" />
                                <span>Đơn giản</span>
                                <Badge variant="secondary" className="text-xs">
                                    Dễ hiểu
                                </Badge>
                            </div>
                        </SelectItem>
                        <SelectItem value="full">
                            <div className="flex items-center gap-2">
                                <Brain className="w-4 h-4 text-primary" />
                                <span>Chi tiết</span>
                                <Badge variant="secondary" className="text-xs">
                                    Đầy đủ
                                </Badge>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <ScrollArea className="flex-1 p-4 md:p-6">
                <div className="space-y-4 max-w-4xl mx-auto" role="log" aria-live="polite" aria-label="Lịch sử trò chuyện">
                    {messages.map((message, index) => (
                        <div key={message.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                            <ChatMessageItem message={message} />
                        </div>
                    ))}

                    {isLoading && (
                        <Card className="p-5 bg-gradient-to-r from-muted/50 to-primary/5 border-primary/20 animate-scale-in">
                            <div className="flex items-center gap-4">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                                    <div
                                        className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"
                                        style={{ animationDelay: "0.2s" }}
                                    />
                                    <div
                                        className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"
                                        style={{ animationDelay: "0.4s" }}
                                    />
                                </div>
                                <Brain className="w-5 h-5 text-primary animate-pulse" />
                                <span className="text-sm font-medium text-muted-foreground">AI đang suy nghĩ...</span>
                            </div>
                        </Card>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="border-t border-border/50 bg-gradient-to-r from-card to-muted/30 p-4 md:p-6">
                <div className="max-w-4xl mx-auto space-y-3">
                    <div className="flex items-end gap-3">
                        <div className="flex-1">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={isRecording ? "Đang ghi âm..." : "Nhập câu hỏi hoặc nhấn micro để nói..."}
                                className="min-h-[80px] resize-none border-primary/20 focus:border-primary transition-colors text-base"
                                disabled={isLoading || isRecording}
                                aria-label="Nhập tin nhắn"
                            />
                        </div>

                        <Button
                            onClick={handleVoiceInput}
                            size="lg"
                            variant={isRecording ? "destructive" : "outline"}
                            className={`gap-2 transition-all duration-300 ${isRecording ? "animate-pulse-glow" : "hover:scale-105"}`}
                            aria-label={isRecording ? "Dừng ghi âm" : "Ghi âm giọng nói"}
                        >
                            {isRecording ? (
                                <>
                                    <StopCircle className="w-5 h-5" />
                                    <span className="hidden sm:inline">Dừng</span>
                                </>
                            ) : (
                                <Mic className="w-5 h-5" />
                            )}
                        </Button>

                        <Button
                            onClick={() => handleSendMessage(input)}
                            size="lg"
                            disabled={!input.trim() || isLoading}
                            className="gap-2 gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                            aria-label="Gửi tin nhắn"
                        >
                            <Send className="w-5 h-5" />
                            <span className="hidden sm:inline">Gửi</span>
                        </Button>
                    </div>

                    {isRecording && (
                        <div
                            className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-scale-in"
                            aria-live="assertive"
                        >
                            <div className="w-2.5 h-2.5 bg-destructive rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-destructive">Đang ghi âm... (nhấn Dừng để kết thúc)</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
