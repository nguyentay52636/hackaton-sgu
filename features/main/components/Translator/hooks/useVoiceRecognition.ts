import { useState, useRef } from "react"
import { useToast } from "@/hooks/use-toast"

export function useVoiceRecognition(
    sourceLang: string,
    onTranscript: (transcript: string) => void
) {
    const [isRecording, setIsRecording] = useState(false)
    const { toast } = useToast()
    const recognitionRef = useRef<any>(null)

    const startRecording = () => {
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            toast({
                title: "Không hỗ trợ",
                description: "Trình duyệt không hỗ trợ nhận dạng giọng nói",
                variant: "destructive",
            })
            return
        }

        // Dừng recording cũ nếu có
        if (recognitionRef.current) {
            recognitionRef.current.stop()
            recognitionRef.current = null
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.lang = sourceLang === "vi" ? "vi-VN" : `${sourceLang}-${sourceLang.toUpperCase()}`
        recognition.continuous = true 
        recognition.interimResults = true

        recognition.onstart = () => {
            setIsRecording(true)
            toast({
                title: "Đang nghe...",
                description: "Hãy nói nội dung bạn muốn",
            })
        }

        recognition.onresult = (event: any) => {
            let fullTranscript = ""

            for (let i = 0; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript
                fullTranscript += transcript + " "
            }

            // Cập nhật transcript (bao gồm cả final và interim)
            if (fullTranscript.trim()) {
                onTranscript(fullTranscript.trim())
            }
        }

        recognition.onerror = (event: any) => {
            setIsRecording(false)
            if (event.error !== "no-speech") {
                toast({
                    title: "Lỗi",
                    description: "Không thể nhận dạng giọng nói",
                    variant: "destructive",
                })
            }
        }

        recognition.onend = () => {
            setIsRecording(false)
            recognitionRef.current = null
        }

        recognitionRef.current = recognition
        recognition.start()
    }

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop()
            recognitionRef.current = null
            setIsRecording(false)
        }
    }

    return { isRecording, startRecording, stopRecording }
}

