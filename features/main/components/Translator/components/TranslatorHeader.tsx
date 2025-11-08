"use client"

import { Badge } from "@/shared/ui/badge"
import { BookOpen, Clock } from "lucide-react"

interface TranslatorHeaderProps {
    savedWordsCount: number
    historyCount: number
}

export function TranslatorHeader({ savedWordsCount, historyCount }: TranslatorHeaderProps) {
    return (
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-end my-4">
                    <div className="hidden md:flex items-center gap-4">
                        <Badge variant="secondary" className="gap-2">
                            <BookOpen className="w-4 h-4" />
                            {savedWordsCount} từ
                        </Badge>
                        <Badge variant="secondary" className="gap-2">
                            <Clock className="w-4 h-4" />
                            {historyCount} lịch sử
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

