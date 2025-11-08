import { useState, useEffect } from "react"
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

    const addToHistory = (item: Omit<TranslationHistory, "id" | "timestamp">) => {
        const newHistory: TranslationHistory = {
            ...item,
            id: Date.now().toString(),
            timestamp: new Date(),
        }
        const updatedHistory = [newHistory, ...history.slice(0, 49)]
        setHistory(updatedHistory)
        localStorage.setItem("translation-history", JSON.stringify(updatedHistory))
    }

    const clearHistory = () => {
        setHistory([])
        localStorage.removeItem("translation-history")
        toast({
            title: "Đã xóa",
            description: "Lịch sử đã được xóa",
        })
    }

    return {
        history,
        addToHistory,
        clearHistory,
    }
}

