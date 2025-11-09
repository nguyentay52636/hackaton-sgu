"use client"

import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Volume2, RefreshCw, Sparkles } from "lucide-react"

interface ProgressCardProps {
  completed: number
  total: number
  progressPercentage: number
  autoPlayAudio: boolean
  onToggleAutoPlay: () => void
  onReset: () => void
  onRegenerate: () => void
  isGenerating: boolean
}

export function ProgressCard({
  completed,
  total,
  progressPercentage,
  autoPlayAudio,
  onToggleAutoPlay,
  onReset,
  onRegenerate,
  isGenerating,
}: ProgressCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Tiến độ học tập</p>
            <p className="text-2xl font-bold text-purple-600">
              {completed}/{total} thẻ
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onToggleAutoPlay}>
              <Volume2 className={`h-4 w-4 mr-2 ${autoPlayAudio ? "text-purple-600" : ""}`} />
              {autoPlayAudio ? "Tắt tự động đọc" : "Bật tự động đọc"}
            </Button>
            <Button variant="outline" size="sm" onClick={onReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm lại
            </Button>
            <Button variant="outline" size="sm" onClick={onRegenerate} disabled={isGenerating}>
              <Sparkles className="h-4 w-4 mr-2" />
              Tạo lại
            </Button>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </Card>
  )
}

