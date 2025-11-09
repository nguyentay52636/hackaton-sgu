"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Volume2 } from "lucide-react"
import { Flashcard } from "../types"
import { LANGUAGES, COLOR_THEMES } from "../constants"

interface FlashcardCardProps {
  card: Flashcard
  isFlipped: boolean
  isMastered: boolean
  fromLang: string
  toLang: string
  onFlip: () => void
  onSpeak: (text: string, lang: string) => void
}

export function FlashcardCard({
  card,
  isFlipped,
  isMastered,
  fromLang,
  toLang,
  onFlip,
  onSpeak,
}: FlashcardCardProps) {
  const colorTheme = card?.difficulty ? COLOR_THEMES[card.difficulty] : COLOR_THEMES.medium

  return (
    <div className="perspective-[1000px] mx-auto max-w-2xl">
      <div
        className={`relative w-full transition-transform duration-500 cursor-pointer ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{ transformStyle: "preserve-3d", minHeight: "400px" }}
        onClick={onFlip}
      >
        {/* Front Side */}
        <Card
          className={`absolute inset-0 [backface-visibility:hidden] border-2 ${colorTheme.bg} ${
            isMastered ? "border-primary" : colorTheme.border
          } ${colorTheme.hover} transition-all shadow-lg`}
        >
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] p-12">
            <div className="text-center space-y-6 w-full">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 bg-background/80 backdrop-blur-sm ${colorTheme.accent} text-xs font-medium rounded-full border ${colorTheme.border}`}
              >
                {LANGUAGES[fromLang as keyof typeof LANGUAGES].flag}{" "}
                {LANGUAGES[fromLang as keyof typeof LANGUAGES].name.toUpperCase()}
                {card?.difficulty && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="capitalize">{card.difficulty}</span>
                  </>
                )}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{card?.front}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onSpeak(card?.front, LANGUAGES[fromLang as keyof typeof LANGUAGES].speech)
                }}
                className={`mt-4 ${colorTheme.accent} hover:bg-background/80`}
              >
                <Volume2 className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] border-2 ${colorTheme.bg} ${
            isMastered ? "border-primary" : colorTheme.border
          } ${colorTheme.hover} transition-all shadow-lg`}
        >
          <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] p-12">
            <div className="text-center space-y-6 w-full">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 bg-background/80 backdrop-blur-sm ${colorTheme.accent} text-xs font-medium rounded-full border ${colorTheme.border}`}
              >
                {LANGUAGES[toLang as keyof typeof LANGUAGES].flag}{" "}
                {LANGUAGES[toLang as keyof typeof LANGUAGES].name.toUpperCase()}
                {card?.difficulty && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="capitalize">{card.difficulty}</span>
                  </>
                )}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">{card?.back}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  onSpeak(card?.back, LANGUAGES[toLang as keyof typeof LANGUAGES].speech)
                }}
                className={`mt-4 ${colorTheme.accent} hover:bg-background/80`}
              >
                <Volume2 className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-6">Click card to flip or use keyboard arrows</p>
    </div>
  )
}

