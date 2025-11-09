"use client"

import { Button } from "@/shared/ui/button"

interface MasteryControlsProps {
  isMastered: boolean
  onMastered: () => void
}

export function MasteryControls({ isMastered, onMastered }: MasteryControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Button
        variant="outline"
        onClick={onMastered}
        className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200 dark:bg-red-950/30 dark:hover:bg-red-950/50 dark:text-red-400 dark:border-red-900"
      >
        Still Learning
      </Button>
      <Button
        variant="outline"
        onClick={onMastered}
        className="bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:hover:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900"
      >
        Know It
      </Button>
      <Button variant="default" onClick={onMastered} className={isMastered ? "bg-primary" : ""}>
        {isMastered ? "Mastered ✓" : "Mark Mastered"}
      </Button>
    </div>
  )
}

