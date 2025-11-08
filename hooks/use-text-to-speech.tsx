"use client"

import { useState, useEffect, useRef } from "react"
import { useAccessibility } from "@/shared/lib/accessibility-context"

interface TTSOptions {
    text: string
    onEnd?: () => void
    onStart?: () => void
    onHighlight?: (charIndex: number, charLength: number) => void
}

export function useTextToSpeech() {
    const { settings } = useAccessibility()
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isSupported, setIsSupported] = useState(false)
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

    useEffect(() => {
        setIsSupported("speechSynthesis" in window)
    }, [])

    const speak = ({ text, onEnd, onStart, onHighlight }: TTSOptions) => {
        if (!isSupported) {
            console.warn("Text-to-Speech not supported")
            return
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utteranceRef.current = utterance

        // Configure voice
        const voices = window.speechSynthesis.getVoices()
        let selectedVoice = voices.find((v) => {
            if (settings.language === "vi") {
                return v.lang.startsWith("vi") || v.lang.includes("Vietnamese")
            }
            return v.lang.startsWith("en")
        })

        // Fallback to any available voice
        if (!selectedVoice) {
            selectedVoice = voices[0]
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice
        }

        utterance.rate = settings.ttsRate
        utterance.pitch = 1.0
        utterance.volume = 1.0
        utterance.lang = settings.language === "vi" ? "vi-VN" : "en-US"

        utterance.onstart = () => {
            setIsSpeaking(true)
            onStart?.()
        }

        utterance.onend = () => {
            setIsSpeaking(false)
            onEnd?.()
        }

        utterance.onerror = (event) => {
            console.error("TTS Error:", event)
            setIsSpeaking(false)
            onEnd?.()
        }

        if (onHighlight) {
            utterance.onboundary = (event) => {
                onHighlight(event.charIndex, event.charLength || 0)
            }
        }

        window.speechSynthesis.speak(utterance)
    }

    const stop = () => {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
    }

    const pause = () => {
        window.speechSynthesis.pause()
    }

    const resume = () => {
        window.speechSynthesis.resume()
    }

    return {
        speak,
        stop,
        pause,
        resume,
        isSpeaking,
        isSupported,
    }
}
