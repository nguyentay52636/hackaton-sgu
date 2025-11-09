import { useState, useEffect } from "react"
import { Flashcard, FlashcardProgress } from "../types"

export function useFlashcardStorage(sessionId: string) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [progress, setProgress] = useState<FlashcardProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load flashcards và progress từ localStorage
  useEffect(() => {
    const savedCards = localStorage.getItem(`flashcards_${sessionId}`)
    const savedProgress = localStorage.getItem(`progress_${sessionId}`)

    if (savedCards) {
      setFlashcards(JSON.parse(savedCards))
      setIsLoading(false)
    }

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [sessionId])

  // Auto save progress
  useEffect(() => {
    if (progress.length > 0) {
      localStorage.setItem(`progress_${sessionId}`, JSON.stringify(progress))
    }
  }, [progress, sessionId])

  const saveFlashcards = (cards: Flashcard[]) => {
    setFlashcards(cards)
    localStorage.setItem(`flashcards_${sessionId}`, JSON.stringify(cards))
  }

  const resetProgress = () => {
    setProgress([])
    localStorage.removeItem(`progress_${sessionId}`)
  }

  return {
    flashcards,
    progress,
    isLoading,
    setFlashcards: saveFlashcards,
    setProgress,
    resetProgress,
    setIsLoading,
  }
}

