export interface Flashcard {
  id: string
  front: string
  back: string
  difficulty?: "easy" | "medium" | "hard"
}

export interface FlashcardProgress {
  cardId: string
  lastReviewed: string
  timesReviewed: number
  confidence: "low" | "medium" | "high"
}

export interface FlashcardViewerProps {
  sessionId: string
  sessionTitle: string
  sessionDescription: string
}

