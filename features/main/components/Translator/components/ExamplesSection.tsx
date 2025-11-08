"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { MessageSquare } from "lucide-react"

interface ExamplesSectionProps {
    examples: string[]
}

export function ExamplesSection({ examples }: ExamplesSectionProps) {
    if (examples.length === 0) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    Ví dụ sử dụng trong câu
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {examples.map((example, i) => (
                        <div key={i} className="p-4 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg border">
                            <p className="text-sm leading-relaxed">{example}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

