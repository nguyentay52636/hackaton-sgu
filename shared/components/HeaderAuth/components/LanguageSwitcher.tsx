'use client'

import { useLanguageStore } from '@/stores/language-store'
import { Button } from '@/shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguageStore()

    const languages = [
        { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'en', label: 'English', flag: '🇺🇸' },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full hover:ring-2 hover:ring-primary/30 transition-all duration-300 hover:scale-105"
                >
                    <Languages className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 hover:rotate-12" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 shadow-xl border-border/50">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as 'en' | 'vi')}
                        className={`flex items-center gap-3 py-3 cursor-pointer ${language === lang.code ? 'bg-muted' : ''
                            }`}
                    >
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-medium">{lang.label}</span>
                        {language === lang.code && (
                            <span className="ml-auto text-primary">✓</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

