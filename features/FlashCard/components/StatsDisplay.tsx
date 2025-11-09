"use client"

import { Card, CardContent } from "@/shared/ui/card"

interface StatsDisplayProps {
  total: number
  mastered: number
  remaining: number
}

export function StatsDisplay({ total, mastered, remaining }: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-foreground">{total}</div>
          <div className="text-sm text-muted-foreground mt-1">Total Cards</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary">{mastered}</div>
          <div className="text-sm text-muted-foreground mt-1">Mastered</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">{remaining}</div>
          <div className="text-sm text-muted-foreground mt-1">Remaining</div>
        </CardContent>
      </Card>
    </div>
  )
}

