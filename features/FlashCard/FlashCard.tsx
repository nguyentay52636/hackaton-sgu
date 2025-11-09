"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { RotateCcw, Languages } from "lucide-react"
import { Flashcard } from "./types"
import { LANGUAGE_DATA } from "./constants"
import { LanguageSelector } from "./components/LanguageSelector"
import { FlashcardCard } from "./components/FlashcardCard"
import { ProgressBar } from "./components/ProgressBar"
import { AIGenerationDialog } from "./components/AIGenerationDialog"
import { NavigationControls } from "./components/NavigationControls"
import { MasteryControls } from "./components/MasteryControls"
import { StatsDisplay } from "./components/StatsDisplay"

export default function FlashCard() {
  const [fromLang, setFromLang] = useState<string>("en")
  const [toLang, setToLang] = useState<string>("vi")
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    const languageKey = `${fromLang}-${toLang}`
    const cards = LANGUAGE_DATA[languageKey] || []
    setFlashcards(cards)
    setCurrentIndex(0)
    setIsFlipped(false)
    setMasteredCards(new Set())
  }, [fromLang, toLang])

  const currentCard = flashcards[currentIndex]
  const isMastered = currentCard && masteredCards.has(currentCard.id)

  const speakText = (text: string, lang: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.85
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleNext = useCallback(() => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
  }, [flashcards.length])

  const handlePrevious = useCallback(() => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
  }, [flashcards.length])

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  const handleMastered = () => {
    setMasteredCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentCard.id)) {
        newSet.delete(currentCard.id)
      } else {
        newSet.add(currentCard.id)
      }
      return newSet
    })
    setTimeout(handleNext, 300)
  }

  const handleReset = () => {
    setMasteredCards(new Set())
    setCurrentIndex(0)
    setIsFlipped(false)
  }

  const handleAIGenerate = (newCards: Flashcard[]) => {
    setFlashcards(newCards)
    setCurrentIndex(0)
    setIsFlipped(false)
    setMasteredCards(new Set())
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case "ArrowRight":
          handleNext()
          break
        case "ArrowLeft":
          handlePrevious()
          break
        case " ":
        case "ArrowUp":
        case "ArrowDown":
          handleFlip()
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleNext, handlePrevious, handleFlip])

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <Languages className="w-12 h-12 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold">No flashcards available</h2>
            <p className="text-sm text-muted-foreground">
              Please select a different language pair or create custom flashcards using AI.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <LanguageSelector
                fromLang={fromLang}
                toLang={toLang}
                onFromLangChange={setFromLang}
                onToLangChange={setToLang}
              />
              <p className="text-sm text-muted-foreground mt-2">Basic Vocabulary Set</p>
            </div>
            <div className="flex gap-2">
              <AIGenerationDialog onGenerate={handleAIGenerate} />
              <Button variant="ghost" size="sm" onClick={handleReset} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Progress Section */}
        <ProgressBar mastered={masteredCards.size} total={flashcards.length} />

        {/* Flashcard Container */}
        <div className="mb-8">
          {currentCard && (
            <FlashcardCard
              card={currentCard}
              isFlipped={isFlipped}
              isMastered={isMastered}
              fromLang={fromLang}
              toLang={toLang}
              onFlip={handleFlip}
              onSpeak={speakText}
            />
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {/* Navigation */}
          <NavigationControls
            currentIndex={currentIndex}
            total={flashcards.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />

          {/* Mastery Controls */}
          <MasteryControls isMastered={!!isMastered} onMastered={handleMastered} />
        </div>

        {/* Stats */}
        <StatsDisplay
          total={flashcards.length}
          mastered={masteredCards.size}
          remaining={flashcards.length - masteredCards.size}
        />
      </main>
    </div>
  )
}
