"use client"

import { useState } from "react"
import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { AudioRecorder } from "./AudioRecorder"
import type { TranscriptSegment } from "@/apis/types"
import { TranscriptSegmentItem } from "./TranscriptSegmentItem"
import { Download, Save, FileText, Sparkles } from "lucide-react"
import { useToast } from "@/shared/hooks/use-toast"
import { exportToText, downloadFile } from "@/shared/lib/export-utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/shared/ui/badge"

export function TranscripPanel() {
  const [segments, setSegments] = useState<TranscriptSegment[]>([])
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [highlightedSegmentId, setHighlightedSegmentId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleTranscribe = async (audioBlob: Blob) => {
    setIsTranscribing(true)

    try {
      const formData = new FormData()
      formData.append("audio", audioBlob)
      formData.append("language", "vi")

      const response = await fetch("/api/stt", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Transcription failed")
      }

      const data = await response.json()
      setSegments((prev) => [...prev, ...data.segments])

      toast({
        title: "Thành công",
        description: "Đã chuyển đổi giọng nói sang văn bản",
      })
    } catch (error) {
      console.error("Transcription error:", error)
      toast({
        title: "Lỗi",
        description: "Không thể chuyển đổi giọng nói. Vui lòng thử lại.",
        variant: "destructive",
      })
    } finally {
      setIsTranscribing(false)
    }
  }

  const handleUpdateSegment = (id: string, text: string) => {
    setSegments((prev) => prev.map((seg) => (seg.id === id ? { ...seg, text } : seg)))
  }

  const handleDeleteSegment = (id: string) => {
    setSegments((prev) => prev.filter((seg) => seg.id !== id))
    toast({
      title: "Đã xóa",
      description: "Đoạn văn bản đã được xóa",
    })
  }

  const handleExportText = () => {
    const text = exportToText(segments)
    downloadFile(text, `transcript-${Date.now()}.txt`)

    toast({
      title: "Đã xuất",
      description: "Văn bản đã được tải xuống dạng TXT",
    })
  }

  const handleExportMarkdown = () => {
    const markdown = segments
      .map(
        (seg, i) =>
          `### Đoạn ${i + 1}\n\n${seg.text}\n\n*Thời gian: ${seg.startTime.toFixed(1)}s - ${seg.endTime.toFixed(1)}s*`,
      )
      .join("\n\n---\n\n")

    downloadFile(markdown, `transcript-${Date.now()}.md`, "text/markdown")

    toast({
      title: "Đã xuất",
      description: "Văn bản đã được tải xuống dạng Markdown",
    })
  }

  const handleSave = () => {
    localStorage.setItem(
      `transcript-${Date.now()}`,
      JSON.stringify({
        segments,
        createdAt: new Date().toISOString(),
      }),
    )

    toast({
      title: "Đã lưu",
      description: "Bản ghi đã được lưu vào lịch sử",
    })
  }

  return (
    <div className="flex flex-col h-full rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-gradient-to-r from-card to-muted/30">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">Văn bản chuyển đổi</h2>
            <Badge variant="secondary" className="font-mono">
              {segments.length}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground font-medium mt-0.5">Speech-to-Text Realtime</p>
        </div>

        <div className="flex items-center gap-2">
          {segments.length > 0 && (
            <>
              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-success/10 hover:border-success hover:text-success transition-all duration-200 hover:scale-105 bg-transparent"
                aria-label="Lưu bản ghi"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Lưu</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-200 hover:scale-105 bg-transparent"
                    aria-label="Xuất file"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Xuất</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="animate-scale-in">
                  <DropdownMenuItem onClick={handleExportText} className="gap-2">
                    <FileText className="w-4 h-4" />
                    Xuất file TXT
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportMarkdown} className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Xuất file Markdown
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-4 md:p-6">
          <AudioRecorder onTranscribe={handleTranscribe} isTranscribing={isTranscribing} />
        </div>

        <ScrollArea className="flex-1 px-4 md:px-6">
          <div className="space-y-4 pb-6" role="log" aria-live="polite" aria-label="Danh sách văn bản đã chuyển đổi">
            {segments.length === 0 ? (
              <Card className="p-12 text-center border-dashed border-2 bg-gradient-to-br from-muted/50 to-background animate-fade-in">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <FileText className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground text-lg font-medium">
                  Nhấn "Bắt đầu ghi âm" để chuyển đổi giọng nói thành văn bản
                </p>
                <p className="text-muted-foreground/70 text-sm mt-2">Hỗ trợ tiếng Việt và tiếng Anh</p>
              </Card>
            ) : (
              segments.map((segment, index) => (
                <div key={segment.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <TranscriptSegmentItem
                    segment={segment}
                    isHighlighted={highlightedSegmentId === segment.id}
                    onUpdate={handleUpdateSegment}
                    onDelete={handleDeleteSegment}
                    onPlayAudio={(id) => setHighlightedSegmentId(id)}
                  />
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
