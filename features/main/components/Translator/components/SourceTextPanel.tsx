"use client"

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import { Globe, Mic, Volume2, X } from "lucide-react"

interface SourceTextPanelProps {
    sourceText: string
    sourceLang: string
    isRecording: boolean
    onTextChange: (text: string) => void
    onStartRecording: () => void
    onSpeak: () => void
}

export function SourceTextPanel({
    sourceText,
    sourceLang,
    isRecording,
    onTextChange,
    onStartRecording,
    onSpeak,
}: SourceTextPanelProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const charCount = sourceText.length

    return (
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
                            onClick={onStartRecording}
                            disabled={isRecording}
                            className={isRecording ? "text-red-500 animate-pulse" : ""}
                        >
                            <Mic className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={onSpeak}
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
                    onChange={(e) => onTextChange(e.target.value)}
                    className="min-h-[320px] resize-none text-lg leading-relaxed border-0 focus-visible:ring-0"
                />
                <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">{charCount} / 5000 ký tự</span>
                    {sourceText && (
                        <Button variant="ghost" size="sm" onClick={() => onTextChange("")}>
                            <X className="w-4 h-4 mr-1" />
                            Xóa
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

