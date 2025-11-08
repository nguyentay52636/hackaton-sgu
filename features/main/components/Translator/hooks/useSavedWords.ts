import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { SavedWord } from "../types"

export function useSavedWords() {
    const [savedWords, setSavedWords] = useState<SavedWord[]>([])
    const { toast } = useToast()

    useEffect(() => {
        const saved = localStorage.getItem("saved-words")
        if (saved) {
            try {
                setSavedWords(JSON.parse(saved))
            } catch (error) {
                console.error("Failed to parse saved words:", error)
            }
        }
    }, [])

    const saveWord = (word: Omit<SavedWord, "id" | "savedAt">) => {
        const newWord: SavedWord = {
            ...word,
            id: Date.now().toString(),
            savedAt: new Date(),
            isFavorite: false,
        }

        const updated = [newWord, ...savedWords]
        setSavedWords(updated)
        localStorage.setItem("saved-words", JSON.stringify(updated))

        toast({
            title: "Đã lưu",
            description: "Từ đã được thêm vào sổ từ vựng",
        })
    }

    const toggleFavorite = (id: string) => {
        const updated = savedWords.map((w) => (w.id === id ? { ...w, isFavorite: !w.isFavorite } : w))
        setSavedWords(updated)
        localStorage.setItem("saved-words", JSON.stringify(updated))
    }

    const deleteWord = (id: string) => {
        const updated = savedWords.filter((w) => w.id !== id)
        setSavedWords(updated)
        localStorage.setItem("saved-words", JSON.stringify(updated))

        toast({
            title: "Đã xóa",
            description: "Từ đã được xóa khỏi sổ từ vựng",
        })
    }

    const exportSavedWords = () => {
        const dataStr = JSON.stringify(savedWords, null, 2)
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `vocabulary-${Date.now()}.json`
        link.click()

        toast({
            title: "Đã xuất file",
            description: "Sổ từ vựng đã được tải xuống",
        })
    }

    return {
        savedWords,
        saveWord,
        toggleFavorite,
        deleteWord,
        exportSavedWords,
    }
}

