"use client"

import { Card } from "@/shared/ui/card"
import { FlashcardProgress } from "../types"

interface StatisticsCardProps {
  progress: FlashcardProgress[]
}

export function StatisticsCard({ progress }: StatisticsCardProps) {
  const highConfidence = progress.filter((p) => p.confidence === "high").length
  const mediumConfidence = progress.filter((p) => p.confidence === "medium").length
  const lowConfidence = progress.filter((p) => p.confidence === "low").length

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Thống kê học tập</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">{highConfidence}</p>
          <p className="text-sm text-muted-foreground">Thẻ dễ</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-yellow-600">{mediumConfidence}</p>
          <p className="text-sm text-muted-foreground">Thẻ trung bình</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-red-600">{lowConfidence}</p>
          <p className="text-sm text-muted-foreground">Thẻ khó</p>
        </div>
      </div>
    </Card>
  )
}

