"use client"

import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Mic, Square, Pause, Play, Trash2, Upload, Radio } from "lucide-react"
import { useAudioRecorder } from "@/hooks/use-audio-recorder"
import { formatTime } from "@/shared/lib/utils"
import { Alert, AlertDescription } from "@/shared/ui/alert"

interface AudioRecorderProps {
  onTranscribe: (audioBlob: Blob) => void
  isTranscribing?: boolean
}

export function AudioRecorder({ onTranscribe, isTranscribing = false }: AudioRecorderProps) {
  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
  } = useAudioRecorder()

  const handleTranscribe = () => {
    if (audioBlob) {
      onTranscribe(audioBlob)
      clearRecording()
    }
  }

  return (
    <Card className="p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive" className="animate-scale-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {!isRecording && !audioBlob && (
              <Button
                onClick={startRecording}
                size="lg"
                className="gap-2 gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                aria-label="Bắt đầu ghi âm"
              >
                <Mic className="w-5 h-5" />
                Bắt đầu ghi âm
              </Button>
            )}

            {isRecording && (
              <>
                <Button
                  onClick={stopRecording}
                  size="lg"
                  variant="destructive"
                  className="gap-2 shadow-lg animate-pulse-glow"
                  aria-label="Dừng ghi âm"
                >
                  <Square className="w-5 h-5" />
                  Dừng
                </Button>

                {!isPaused ? (
                  <Button
                    onClick={pauseRecording}
                    size="lg"
                    variant="outline"
                    className="gap-2 hover:bg-accent/10 hover:border-accent transition-all duration-200 bg-transparent"
                    aria-label="Tạm dừng"
                  >
                    <Pause className="w-5 h-5" />
                    Tạm dừng
                  </Button>
                ) : (
                  <Button
                    onClick={resumeRecording}
                    size="lg"
                    variant="outline"
                    className="gap-2 hover:bg-success/10 hover:border-success hover:text-success transition-all duration-200 bg-transparent"
                    aria-label="Tiếp tục"
                  >
                    <Play className="w-5 h-5" />
                    Tiếp tục
                  </Button>
                )}
              </>
            )}

            {audioBlob && !isRecording && (
              <>
                <Button
                  onClick={handleTranscribe}
                  size="lg"
                  disabled={isTranscribing}
                  className="gap-2 gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  aria-label="Chuyển đổi sang văn bản"
                >
                  <Upload className="w-5 h-5" />
                  {isTranscribing ? "Đang xử lý..." : "Chuyển đổi sang văn bản"}
                </Button>

                <Button
                  onClick={clearRecording}
                  size="lg"
                  variant="outline"
                  className="gap-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-all duration-200 bg-transparent"
                  aria-label="Xóa ghi âm"
                  disabled={isTranscribing}
                >
                  <Trash2 className="w-5 h-5" />
                  Xóa
                </Button>
              </>
            )}
          </div>

          {(isRecording || audioBlob) && (
            <div className="text-right animate-fade-in">
              <div className="text-3xl font-mono font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {formatTime(recordingTime)}
              </div>
              <div className="text-sm text-muted-foreground font-medium mt-1">
                {isRecording ? (isPaused ? "Đã tạm dừng" : "Đang ghi âm...") : "Ghi âm hoàn tất"}
              </div>
            </div>
          )}
        </div>

        {isRecording && (
          <div
            className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 animate-scale-in"
            aria-live="polite"
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-destructive rounded-full animate-pulse" />
              <div
                className="w-2.5 h-2.5 bg-destructive rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-2.5 h-2.5 bg-destructive rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
            <Radio className="w-4 h-4 text-destructive animate-pulse" />
            <span className="text-sm font-medium text-destructive">Microphone đang hoạt động</span>
          </div>
        )}
      </div>
    </Card>
  )
}
