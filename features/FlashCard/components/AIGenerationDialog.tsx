"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Label } from "@/shared/ui/label"
import { Flashcard } from "../types"

interface AIGenerationDialogProps {
  onGenerate: (cards: Flashcard[]) => void
}

export function AIGenerationDialog({ onGenerate }: AIGenerationDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [aiTopic, setAiTopic] = useState("")
  const [aiContext, setAiContext] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!aiTopic.trim()) return

    setIsGenerating(true)

    setTimeout(() => {
      const newCards: Flashcard[] = [
        {
          id: `ai-${Date.now()}-1`,
          front: `${aiTopic} - Concept 1`,
          back: `Explanation about ${aiTopic} concept 1`,
          difficulty: "medium",
        },
        {
          id: `ai-${Date.now()}-2`,
          front: `${aiTopic} - Concept 2`,
          back: `Explanation about ${aiTopic} concept 2`,
          difficulty: "easy",
        },
        {
          id: `ai-${Date.now()}-3`,
          front: `${aiTopic} - Advanced Topic`,
          back: `Deep dive into ${aiTopic}`,
          difficulty: "hard",
        },
        {
          id: `ai-${Date.now()}-4`,
          front: `Key Term: ${aiTopic}`,
          back: `Definition and usage of ${aiTopic}`,
          difficulty: "medium",
        },
        {
          id: `ai-${Date.now()}-5`,
          front: `Example of ${aiTopic}`,
          back: `Practical example showing ${aiTopic} in action`,
          difficulty: "easy",
        },
      ]

      onGenerate(newCards)
      setIsGenerating(false)
      setIsOpen(false)
      setAiTopic("")
      setAiContext("")
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <Sparkles className="w-4 h-4" />
          AI Tạo Flashcard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-600" />
            Tạo Flashcard với AI
          </DialogTitle>
          <DialogDescription>
            Nhập chủ đề bạn muốn học và AI sẽ tự động tạo flashcard cho bạn
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Chủ đề học *</Label>
            <Input
              id="topic"
              placeholder="Ví dụ: JavaScript Promises, React Hooks, Photosynthesis..."
              value={aiTopic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAiTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="context">Ngữ cảnh bổ sung (tùy chọn)</Label>
            <Textarea
              id="context"
              placeholder="Thêm thông tin về mức độ, mục tiêu học tập của bạn..."
              value={aiContext}
              onChange={(e) => setAiContext(e.target.value)}
              rows={3}
            />
          </div>
          <Button
            onClick={handleGenerate}
            className="w-full gap-2"
            disabled={!aiTopic.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Đang tạo flashcard...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Tạo Flashcard
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            AI sẽ tạo 5-10 flashcard dựa trên chủ đề của bạn
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

