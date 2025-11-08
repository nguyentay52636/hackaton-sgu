"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { AccessibilitySettings } from "@/apis/types"

const defaultSettings: AccessibilitySettings = {
    fontSize: "normal",
    highContrast: false,
    darkMode: false,
    ttsVoice: "female_vi",
    ttsRate: 1.0,
    autoHighlight: true,
    language: "vi",
}

interface AccessibilityContextType {
    settings: AccessibilitySettings
    updateSettings: (updates: Partial<AccessibilitySettings>) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)

    useEffect(() => {
        // Load settings from localStorage
        const saved = localStorage.getItem("accessibility-settings")
        if (saved) {
            try {
                setSettings(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse accessibility settings:", e)
            }
        }
    }, [])

    useEffect(() => {
        // Apply font size class to body
        document.body.className = document.body.className
            .split(" ")
            .filter((c) => !c.startsWith("font-size-"))
            .join(" ")
        document.body.classList.add(`font-size-${settings.fontSize}`)

        // Apply high contrast
        if (settings.highContrast) {
            document.documentElement.classList.add("high-contrast")
        } else {
            document.documentElement.classList.remove("high-contrast")
        }

        // Apply dark mode
        if (settings.darkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }

        // Save to localStorage
        localStorage.setItem("accessibility-settings", JSON.stringify(settings))
    }, [settings])

    const updateSettings = (updates: Partial<AccessibilitySettings>) => {
        setSettings((prev) => ({ ...prev, ...updates }))
    }

    return <AccessibilityContext.Provider value={{ settings, updateSettings }}>{children}</AccessibilityContext.Provider>
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext)
    if (!context) {
        throw new Error("useAccessibility must be used within AccessibilityProvider")
    }
    return context
}
