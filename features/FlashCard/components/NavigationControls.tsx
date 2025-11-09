"use client"

import { Button } from "@/shared/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationControlsProps {
  currentIndex: number
  total: number
  onPrevious: () => void
  onNext: () => void
}

export function NavigationControls({ currentIndex, total, onPrevious, onNext }: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button variant="outline" size="lg" onClick={onPrevious} className="gap-2 bg-transparent">
        <ChevronLeft className="w-5 h-5" />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">{currentIndex + 1}</span>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm font-medium text-foreground">{total}</span>
      </div>

      <Button variant="outline" size="lg" onClick={onNext} className="gap-2 bg-transparent">
        Next
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  )
}

