"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  isGenerating: boolean
}

export function LoadingState({ isGenerating }: LoadingStateProps) {
  return (
    <Card className="p-12">
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
        <p className="text-lg font-medium">
          {isGenerating ? "AI đang tạo flashcards cho bạn..." : "Đang tải..."}
        </p>
        <p className="text-sm text-muted-foreground">Vui lòng đợi trong giây lát</p>
      </CardContent>
    </Card>
  )
}

