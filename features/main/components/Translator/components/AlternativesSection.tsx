"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Lightbulb } from "lucide-react"
import { Alternative } from "../types"

interface AlternativesSectionProps {
    alternatives: Alternative[]
    onSelect: (text: string) => void
}

export function AlternativesSection({ alternatives, onSelect }: AlternativesSectionProps) {
    if (alternatives.length === 0) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    Các cách dịch khác
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {alternatives.map((alt, i) => (
                        <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            onClick={() => onSelect(alt.text)}
                            className="gap-2"
                        >
                            {alt.text}
                            <Badge variant="secondary" className="text-xs">
                                {Math.round(alt.confidence * 100)}%
                            </Badge>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

