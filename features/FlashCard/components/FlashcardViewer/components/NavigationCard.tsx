"use client"

import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { RotateCcw, ChevronLeft, ChevronRight, Volume2, Loader2 } from "lucide-react"

interface NavigationCardProps {
  canGoPrevious: boolean
  canGoNext: boolean
  isSpeaking: boolean
  onPrevious: () => void
  onNext: () => void
  onFlip: () => void
  onSpeakBoth: () => void
}

export function NavigationCard({
  canGoPrevious,
  canGoNext,
  isSpeaking,
  onPrevious,
  onNext,
  onFlip,
  onSpeakBoth,
}: NavigationCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" onClick={onPrevious} disabled={!canGoPrevious}>
          <ChevronLeft className="h-5 w-5" />
          Trước
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onFlip}>
            <RotateCcw className="h-5 w-5 mr-2" />
            Lật thẻ
          </Button>

          <Button
            variant="default"
            onClick={onSpeakBoth}
            disabled={isSpeaking}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isSpeaking ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>

        <Button variant="outline" onClick={onNext} disabled={!canGoNext}>
          Sau
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  )
}

