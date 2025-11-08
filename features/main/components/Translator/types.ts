export interface SavedWord {
    id: string
    original: string
    translation: string
    fromLang: string
    toLang: string
    examples: string[]
    savedAt: Date
    isFavorite?: boolean
}

export interface TranslationHistory {
    id: string
    original: string
    translation: string
    fromLang: string
    toLang: string
    timestamp: Date
}

export interface Alternative {
    text: string
    confidence: number
}

export interface Language {
    code: string
    name: string
    flag: string
}

export type TabType = "translate" | "history" | "saved"

