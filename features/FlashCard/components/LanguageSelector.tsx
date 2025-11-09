"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { LANGUAGES } from "../constants"

interface LanguageSelectorProps {
    fromLang: string
    toLang: string
    onFromLangChange: (lang: string) => void
    onToLangChange: (lang: string) => void
}

export function LanguageSelector({ fromLang, toLang, onFromLangChange, onToLangChange }: LanguageSelectorProps) {
    return (
        <div className="flex items-center gap-3">
            <Select value={fromLang} onValueChange={onFromLangChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(LANGUAGES).map(([code, lang]) => (
                        <SelectItem key={code} value={code}>
                            {lang.flag} {lang.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="text-muted-foreground">→</div>

            <Select value={toLang} onValueChange={onToLangChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(LANGUAGES)
                        .filter(([code]) => code !== fromLang)
                        .map(([code, lang]) => (
                            <SelectItem key={code} value={code}>
                                {lang.flag} {lang.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    )
}

