"use client"

import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { XCircle, Brain, CheckCircle2 } from "lucide-react"

interface ConfidenceMarkingCardProps {
  onMarkConfidence: (confidence: "low" | "medium" | "high") => void
}

export function ConfidenceMarkingCard({ onMarkConfidence }: ConfidenceMarkingCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">Đánh giá độ hiểu:</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMarkConfidence("low")}
            className="hover:bg-red-50 hover:border-red-300"
          >
            <XCircle className="h-4 w-4 mr-1 text-red-500" />
            Khó
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMarkConfidence("medium")}
            className="hover:bg-yellow-50 hover:border-yellow-300"
          >
            <Brain className="h-4 w-4 mr-1 text-yellow-500" />
            TB
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMarkConfidence("high")}
            className="hover:bg-green-50 hover:border-green-300"
          >
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Dễ
          </Button>
        </div>
      </div>
    </Card>
  )
}

