import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { TranslationHistory } from "../types"

export function useHistory() {
    const [history, setHistory] = useState<TranslationHistory[]>([])
    const { toast } = useToast()

    useEffect(() => {
        const historyData = localStorage.getItem("translation-history")
        if (historyData) {
            try {
                setHistory(JSON.parse(historyData))
            } catch (error) {
                console.error("Failed to parse history:", error)
            }
        }
    }, [])

    const addToHistory = useCallback((item: Omit<TranslationHistory, "id" | "timestamp">) => {
        setHistory((prevHistory) => {
            const newHistory: TranslationHistory = {
                ...item,
                id: Date.now().toString(),
                timestamp: new Date(),
            }
            const updatedHistory = [newHistory, ...prevHistory.slice(0, 49)]
            localStorage.setItem("translation-history", JSON.stringify(updatedHistory))
            return updatedHistory
        })
    }, [])

    const clearHistory = useCallback(() => {
        setHistory([])
        localStorage.removeItem("translation-history")
        toast({
            title: "Đã xóa",
            description: "Lịch sử đã được xóa",
        })
    }, [toast])

    return {
        history,
        addToHistory,
        clearHistory,
    }
}

