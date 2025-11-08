'use client'

import { useEffect } from 'react'
import { useLanguageStore } from '@/stores/language-store'

export function DynamicLang() {
    const { language } = useLanguageStore()

    useEffect(() => {
        document.documentElement.lang = language
    }, [language])

    return null
}

