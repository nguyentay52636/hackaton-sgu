"use client"

import { useState } from "react"
import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Textarea } from "@/shared/ui/textarea"
import type { TranscriptSegment } from "@/apis/types"
import { Edit2, Save, X, Trash2, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { useTextToSpeech } from "@/hooks/use-text-to-speech"

interface TranscriptSegmentItemProps {
    segment: TranscriptSegment
    isHighlighted: boolean
    onUpdate: (id: string, text: string) => void
    onDelete: (id: string) => void
    onPlayAudio: (id: string) => void
}

export function TranscriptSegmentItem({
    segment,
    isHighlighted,
    onUpdate,
    onDelete,
    onPlayAudio,
}: TranscriptSegmentItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(segment.text)
    const { speak, stop, isSpeaking } = useTextToSpeech()

    const handleSave = () => {
        onUpdate(segment.id, editText)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditText(segment.text)
        setIsEditing(false)
    }

    const handlePlayAudio = () => {
        if (isSpeaking) {
            stop()
        } else {
            onPlayAudio(segment.id)
            speak({
                text: segment.text,
                onEnd: () => onPlayAudio(""),
            })
        }
    }

    return (
        <Card className={cn("p-4 transition-colors", isHighlighted && "ring-2 ring-accent")}>
            {isEditing ? (
                <div className="space-y-3">
                    <Textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="min-h-[100px] text-base leading-relaxed"
                        aria-label="Chỉnh sửa văn bản"
                        autoFocus
                    />
                    <div className="flex items-center gap-2">
                        <Button onClick={handleSave} size="sm" className="gap-2" aria-label="Lưu thay đổi">
                            <Save className="w-4 h-4" />
                            Lưu
                        </Button>
                        <Button
                            onClick={handleCancel}
                            size="sm"
                            variant="outline"
                            className="gap-2 bg-transparent"
                            aria-label="Hủy chỉnh sửa"
                        >
                            <X className="w-4 h-4" />
                            Hủy
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className={cn("text-base leading-relaxed", isHighlighted && "highlight-sentence")}>{segment.text}</p>

                    <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                            {segment.startTime.toFixed(1)}s - {segment.endTime.toFixed(1)}s
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handlePlayAudio}
                                size="sm"
                                variant="ghost"
                                className="gap-2"
                                aria-label={isSpeaking ? "Dừng đọc" : "Đọc to đoạn văn bản"}
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
                            <Button
                                onClick={() => setIsEditing(true)}
                                size="sm"
                                variant="ghost"
                                className="gap-2"
                                aria-label="Chỉnh sửa"
                            >
                                <Edit2 className="w-4 h-4" />
                                Sửa
                            </Button>
                            <Button
                                onClick={() => onDelete(segment.id)}
                                size="sm"
                                variant="ghost"
                                className="gap-2 text-destructive hover:text-destructive"
                                aria-label="Xóa"
                            >
                                <Trash2 className="w-4 h-4" />
                                Xóa
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    )
}
