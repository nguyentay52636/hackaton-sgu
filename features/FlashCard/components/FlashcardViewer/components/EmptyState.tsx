"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Brain, Sparkles } from "lucide-react"

interface EmptyStateProps {
  onGenerate: () => void
  isGenerating: boolean
}

export function EmptyState({ onGenerate, isGenerating }: EmptyStateProps) {
  return (
    <Card className="p-12">
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <Brain className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Chưa có flashcards</p>
        <Button onClick={onGenerate} disabled={isGenerating}>
          <Sparkles className="h-4 w-4 mr-2" />
          Tạo Flashcards với AI
        </Button>
      </CardContent>
    </Card>
  )
}

