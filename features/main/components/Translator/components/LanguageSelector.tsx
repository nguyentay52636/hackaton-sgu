"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { ArrowLeftRight } from "lucide-react"
import { LANGUAGES } from "../constants"

interface LanguageSelectorProps {
    sourceLang: string
    targetLang: string
    onSourceLangChange: (lang: string) => void
    onTargetLangChange: (lang: string) => void
    onSwap: () => void
}

export function LanguageSelector({
    sourceLang,
    targetLang,
    onSourceLangChange,
    onTargetLangChange,
    onSwap,
}: LanguageSelectorProps) {
    return (
        <Card className="border-2">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4">
                    <Select value={sourceLang} onValueChange={onSourceLangChange}>
                        <SelectTrigger className="w-full h-12 text-lg font-medium">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map((lang) => (
                                <SelectItem key={lang.code} value={lang.code} className="text-lg">
                                    <span className="flex items-center gap-2">
                                        <span>{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onSwap}
                        className="shrink-0 w-12 h-12 rounded-xl hover:rotate-180 transition-transform duration-300 bg-transparent"
                    >
                        <ArrowLeftRight className="w-5 h-5" />
                    </Button>

                    <Select value={targetLang} onValueChange={onTargetLangChange}>
                        <SelectTrigger className="w-full h-12 text-lg font-medium">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {LANGUAGES.map((lang) => (
                                <SelectItem key={lang.code} value={lang.code} className="text-lg">
                                    <span className="flex items-center gap-2">
                                        <span>{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}

