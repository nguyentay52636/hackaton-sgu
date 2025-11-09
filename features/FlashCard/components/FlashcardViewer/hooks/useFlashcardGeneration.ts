import { useState, useCallback } from "react"
import { Flashcard } from "../types"

interface UseFlashcardGenerationProps {
  sessionId: string
  sessionTitle: string
  sessionDescription: string
  onGenerate: (cards: Flashcard[]) => void
}

export function useFlashcardGeneration({
  sessionId,
  sessionTitle,
  sessionDescription,
  onGenerate,
}: UseFlashcardGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateFlashcards = useCallback(async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/flashcards/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionTitle,
          sessionDescription,
          sessionId,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate flashcards")

      const data = await response.json()
      onGenerate(data.flashcards)
    } catch (error) {
      console.error("Error generating flashcards:", error)
      // Fallback data nếu API lỗi
      const fallbackCards: Flashcard[] = [
        {
          id: "1",
          front: sessionTitle,
          back: sessionDescription || "Nội dung bài học chính",
          difficulty: "medium",
        },
      ]
      onGenerate(fallbackCards)
    } finally {
      setIsGenerating(false)
    }
  }, [sessionId, sessionTitle, sessionDescription, onGenerate])

  return {
    generateFlashcards,
    isGenerating,
  }
}

