"use client"

import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import type { ChatMessage } from "@/apis/types"
import { Volume2, VolumeX, Copy, Check } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { useState } from "react"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"

interface ChatMessageItemProps {
    message: ChatMessage
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
    const [isCopied, setIsCopied] = useState(false)
    const { speak, stop, isSpeaking } = useTextToSpeech()

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.content)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    const handlePlayAudio = () => {
        if (isSpeaking) {
            stop()
        } else {
            speak({ text: message.content })
        }
    }

    return (
        <div className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
            <Card
                className={cn("p-4 max-w-[85%]", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card")}
            >
                <div className="space-y-3">
                    <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>

                    <div className="flex items-center justify-between gap-2">
                        <div className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>

                        <div className="flex items-center gap-1">
                            {message.role === "assistant" && (
                                <Button
                                    onClick={handlePlayAudio}
                                    size="sm"
                                    variant="ghost"
                                    className={cn(
                                        "h-8 gap-2",
                                        message.role === "assistant" ? "text-primary-foreground hover:bg-primary-foreground/10" : "",
                                    )}
                                    aria-label={isSpeaking ? "Dừng đọc" : "Đọc to tin nhắn"}
                                >
                                    {isSpeaking ? (
                                        <>
                                            <VolumeX className="w-4 h-4" />
                                            Dừng
                                        </>
                                    ) : (
                                        <>
                                            <Volume2 className="w-4 h-4" />
                                            Đọc
                                        </>
                                    )}
                                </Button>
                            )}

                            <Button
                                onClick={handleCopy}
                                size="sm"
                                variant="ghost"
                                className={cn(
                                    "h-8 gap-2",
                                    message.role === "user" ? "text-primary-foreground hover:bg-primary-foreground/10" : "",
                                )}
                                aria-label="Sao chép tin nhắn"
                            >
                                {isCopied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Đã sao chép
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Sao chép
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
