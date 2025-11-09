"use client"

import { Progress } from "@/shared/ui/progress"

interface ProgressBarProps {
  mastered: number
  total: number
}

export function ProgressBar({ mastered, total }: ProgressBarProps) {
  const progress = total > 0 ? (mastered / total) * 100 : 0

  return (
    <div className="mb-8 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">
          Progress: {mastered} / {total} mastered
        </span>
        <span className="text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

