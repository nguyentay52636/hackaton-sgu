"use client"

import { useState, useEffect, useCallback } from "react"
import { FlashcardViewerProps, Flashcard } from "./types"
import { useFlashcardStorage } from "./hooks/useFlashcardStorage"
import { useSpeech } from "./hooks/useSpeech"
import { useFlashcardGeneration } from "./hooks/useFlashcardGeneration"
import { LoadingState } from "./components/LoadingState"
import { EmptyState } from "./components/EmptyState"
import { ProgressCard } from "./components/ProgressCard"
import { FlashcardDisplay } from "./components/FlashcardDisplay"
import { NavigationCard } from "./components/NavigationCard"
import { ConfidenceMarkingCard } from "./components/ConfidenceMarkingCard"
import { StatisticsCard } from "./components/StatisticsCard"

export default function FlashcardViewer({ sessionId, sessionTitle, sessionDescription }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [autoPlayAudio, setAutoPlayAudio] = useState(false)

  const {
    flashcards,
    progress,
    isLoading,
    setFlashcards,
    setProgress,
    resetProgress,
    setIsLoading,
  } = useFlashcardStorage(sessionId)

  const { speakText, isSpeaking } = useSpeech()

  const handleGenerate = useCallback(
    (cards: Flashcard[]) => {
      setFlashcards(cards)
      setIsLoading(false)
    },
    [setFlashcards, setIsLoading],
  )

  const { generateFlashcards, isGenerating } = useFlashcardGeneration({
    sessionId,
    sessionTitle,
    sessionDescription,
    onGenerate: handleGenerate,
  })

  // Generate flashcards on mount if none exist
  useEffect(() => {
    if (!isLoading && flashcards.length === 0) {
      generateFlashcards()
    }
  }, [isLoading, flashcards.length, generateFlashcards])

  const speakBothSides = useCallback(async () => {
    const currentCard = flashcards[currentIndex]
    if (!currentCard) return

    await speakText(`Mặt trước. ${currentCard.front}`)
    setTimeout(async () => {
      await speakText(`Mặt sau. ${currentCard.back}`)
    }, 1500)
  }, [flashcards, currentIndex, speakText])

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  const handleNext = useCallback(() => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)

      if (autoPlayAudio) {
        setTimeout(() => {
          speakText(flashcards[currentIndex + 1].front)
        }, 300)
      }
    }
  }, [currentIndex, flashcards, autoPlayAudio, speakText])

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)

      if (autoPlayAudio) {
        setTimeout(() => {
          speakText(flashcards[currentIndex - 1].front)
        }, 300)
      }
    }
  }, [currentIndex, flashcards, autoPlayAudio, speakText])

  const markConfidence = useCallback(
    (confidence: "low" | "medium" | "high") => {
      const currentCard = flashcards[currentIndex]
      if (!currentCard) return

      setProgress((prev) => {
        const existing = prev.find((p) => p.cardId === currentCard.id)
        if (existing) {
          return prev.map((p) =>
            p.cardId === currentCard.id
              ? { ...p, confidence, lastReviewed: new Date().toISOString(), timesReviewed: p.timesReviewed + 1 }
              : p,
          )
        } else {
          return [
            ...prev,
            {
              cardId: currentCard.id,
              confidence,
              lastReviewed: new Date().toISOString(),
              timesReviewed: 1,
            },
          ]
        }
      })

      // Auto next
      setTimeout(handleNext, 400)
    },
    [flashcards, currentIndex, setProgress, handleNext],
  )

  const handleReset = useCallback(() => {
    resetProgress()
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [resetProgress])

  const currentCard = flashcards[currentIndex]
  const currentProgress = currentCard ? progress.find((p) => p.cardId === currentCard.id) : null
  const completedCards = progress.length
  const progressPercentage = flashcards.length > 0 ? (completedCards / flashcards.length) * 100 : 0

  if (isLoading || isGenerating) {
    return <LoadingState isGenerating={isGenerating} />
  }

  if (flashcards.length === 0) {
    return <EmptyState onGenerate={generateFlashcards} isGenerating={isGenerating} />
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <ProgressCard
        completed={completedCards}
        total={flashcards.length}
        progressPercentage={progressPercentage}
        autoPlayAudio={autoPlayAudio}
        onToggleAutoPlay={() => setAutoPlayAudio(!autoPlayAudio)}
        onReset={handleReset}
        onRegenerate={generateFlashcards}
        isGenerating={isGenerating}
      />

      {/* Main Flashcard */}
      {currentCard && (
        <FlashcardDisplay
          card={currentCard}
          isFlipped={isFlipped}
          currentIndex={currentIndex}
          total={flashcards.length}
          currentProgress={currentProgress || null}
          onFlip={handleFlip}
        />
      )}

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Navigation */}
        <NavigationCard
          canGoPrevious={currentIndex > 0}
          canGoNext={currentIndex < flashcards.length - 1}
          isSpeaking={isSpeaking}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onFlip={handleFlip}
          onSpeakBoth={speakBothSides}
        />

        {/* Confidence Marking */}
        <ConfidenceMarkingCard onMarkConfidence={markConfidence} />
      </div>

      {/* Statistics */}
      <StatisticsCard progress={progress} />
    </div>
  )
}
