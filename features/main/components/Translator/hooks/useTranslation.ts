import { useState, useEffect, useCallback, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { Alternative } from "../types"
import { LANGUAGES } from "../constants"

export function useTranslation(
    sourceText: string,
    sourceLang: string,
    targetLang: string,
    onTranslationComplete?: (translation: string) => void
) {
    const [translatedText, setTranslatedText] = useState("")
    const [examples, setExamples] = useState<string[]>([])
    const [alternatives, setAlternatives] = useState<Alternative[]>([])
    const [isTranslating, setIsTranslating] = useState(false)
    const { toast } = useToast()
    const onTranslationCompleteRef = useRef(onTranslationComplete)

    // Update ref when callback changes
    useEffect(() => {
        onTranslationCompleteRef.current = onTranslationComplete
    }, [onTranslationComplete])

    const handleTranslate = useCallback(async (isAuto = false) => {
        if (!sourceText.trim()) {
            setTranslatedText("")
            return
        }

        // Nếu cùng ngôn ngữ, không cần dịch
        if (sourceLang === targetLang) {
            setTranslatedText(sourceText)
            onTranslationCompleteRef.current?.(sourceText)
            setExamples([])
            setAlternatives([])
            return
        }

        if (!isAuto) setIsTranslating(true)

        try {
            const translateResponse = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: sourceText,
                    sourceLang,
                    targetLang,
                }),
            })

            if (!translateResponse.ok) {
                const errorData = await translateResponse.json()
                throw new Error(errorData.error || "Không thể dịch văn bản")
            }

            const translateData = await translateResponse.json()
            const translation = translateData.translation || ""
            setTranslatedText(translation)
            onTranslationCompleteRef.current?.(translation)

            if (!isAuto) {
                await new Promise(resolve => setTimeout(resolve, 3000))

                try {
                    const examplesResponse = await fetch("/api/get-examples", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            word: sourceText,
                            sourceLang,
                            targetLang,
                        }),
                    })

                    if (examplesResponse.ok) {
                        const examplesData = await examplesResponse.json()
                        setExamples(examplesData.examples || [])
                    }
                } catch (error) {
                    console.log("[Translator] Failed to get examples:", error)
                    setExamples([])
                }

                await new Promise(resolve => setTimeout(resolve, 3000))

                try {
                    const alternativesResponse = await fetch("/api/get-alternatives", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            text: sourceText,
                            sourceLang,
                            targetLang,
                        }),
                    })

                    if (alternativesResponse.ok) {
                        const alternativesData = await alternativesResponse.json()
                        setAlternatives(alternativesData.alternatives || [])
                    }
                } catch (error) {
                    console.log("[Translator] Failed to get alternatives:", error)
                    setAlternatives([])
                }
            } else {
                setExamples([])
                setAlternatives([])
            }

            if (!isAuto) {
                toast({
                    title: "Dịch thành công",
                    description: `Đã dịch sang ${LANGUAGES.find((l) => l.code === targetLang)?.name}`,
                })
            }
        } catch (error: any) {
            const errorMessage = error.message || "Không thể dịch văn bản"
            toast({
                title: "Lỗi",
                description: errorMessage,
                variant: "destructive",
            })
            setExamples([])
            setAlternatives([])
        } finally {
            if (!isAuto) setIsTranslating(false)
        }
    }, [sourceText, sourceLang, targetLang, toast])

    useEffect(() => {
        if (!sourceText.trim()) {
            setTranslatedText("")
            setExamples([])
            setAlternatives([])
            return
        }

        // Nếu cùng ngôn ngữ, không cần auto translate
        if (sourceLang === targetLang) {
            setTranslatedText(sourceText)
            setExamples([])
            setAlternatives([])
            return
        }

        const timer = setTimeout(() => {
            handleTranslate(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [sourceText, sourceLang, targetLang, handleTranslate])

    return {
        translatedText,
        examples,
        alternatives,
        isTranslating,
        handleTranslate,
        setTranslatedText,
    }
}

