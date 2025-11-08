import { useToast } from "@/hooks/use-toast"

export function useTextToSpeech() {
    const { toast } = useToast()

    const speakText = (text: string, lang: string) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel()
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = lang === "vi" ? "vi-VN" : lang === "en" ? "en-US" : `${lang}-${lang.toUpperCase()}`
            utterance.rate = 0.9
            window.speechSynthesis.speak(utterance)

            toast({
                title: "Đang phát âm",
                description: "Nghe cách phát âm",
            })
        }
    }

    return { speakText }
}

