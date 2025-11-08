import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function useVoiceRecognition(
    sourceLang: string,
    onTranscript: (transcript: string) => void
) {
    const [isRecording, setIsRecording] = useState(false)
    const { toast } = useToast()

    const startRecording = () => {
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            toast({
                title: "Không hỗ trợ",
                description: "Trình duyệt không hỗ trợ nhận dạng giọng nói",
                variant: "destructive",
            })
            return
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.lang = sourceLang === "vi" ? "vi-VN" : `${sourceLang}-${sourceLang.toUpperCase()}`
        recognition.continuous = false
        recognition.interimResults = false

        recognition.onstart = () => {
            setIsRecording(true)
            toast({
                title: "Đang nghe...",
                description: "Hãy nói nội dung bạn muốn dịch",
            })
        }

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript
            onTranscript(transcript)
            setIsRecording(false)
        }

        recognition.onerror = () => {
            setIsRecording(false)
            toast({
                title: "Lỗi",
                description: "Không thể nhận dạng giọng nói",
                variant: "destructive",
            })
        }

        recognition.onend = () => {
            setIsRecording(false)
        }

        recognition.start()
    }

    return { isRecording, startRecording }
}

