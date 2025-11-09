"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Flashcard, FlashcardProgress } from "../types"

interface FlashcardDisplayProps {
  card: Flashcard
  isFlipped: boolean
  currentIndex: number
  total: number
  currentProgress: FlashcardProgress | null
  onFlip: () => void
}

export function FlashcardDisplay({
  card,
  isFlipped,
  currentIndex,
  total,
  currentProgress,
  onFlip,
}: FlashcardDisplayProps) {
  return (
    <div className="relative perspective-1000">
      <Card
        className={`relative h-96 cursor-pointer transition-all duration-500 transform-gpu ${
          isFlipped ? "rotate-y-180" : ""
        } shadow-2xl hover:shadow-3xl`}
        onClick={onFlip}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side */}
        <CardContent
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden ${
            isFlipped ? "opacity-0" : "opacity-100"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">Mặt trước</Badge>
          <p className="text-3xl font-bold text-center text-balance">{card?.front}</p>
          <p className="text-sm text-muted-foreground mt-8">Nhấn để lật thẻ</p>
        </CardContent>

        {/* Back Side */}
        <CardContent
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 backface-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 ${
            isFlipped ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-pink-600">Mặt sau</Badge>
          <p className="text-2xl font-semibold text-center text-balance">{card?.back}</p>
          <p className="text-sm text-muted-foreground mt-8">Nhấn để lật lại</p>
        </CardContent>
      </Card>

      {/* Card Counter */}
      <div className="absolute -top-4 right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border">
        <p className="text-sm font-medium">
          {currentIndex + 1} / {total}
        </p>
      </div>

      {/* Current Progress Indicator */}
      {currentProgress && (
        <div className="absolute -top-4 left-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border">
          <Badge
            variant={
              currentProgress.confidence === "high"
                ? "default"
                : currentProgress.confidence === "medium"
                  ? "secondary"
                  : "outline"
            }
          >
            {currentProgress.confidence === "high"
              ? "😊 Tự tin"
              : currentProgress.confidence === "medium"
                ? "😐 Bình thường"
                : "😕 Cần học thêm"}
          </Badge>
        </div>
      )}
    </div>
  )
}

