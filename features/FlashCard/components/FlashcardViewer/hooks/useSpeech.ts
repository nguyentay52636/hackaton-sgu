import { useState } from "react"

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speakText = async (text: string) => {
    if (isSpeaking) return

    setIsSpeaking(true)
    try {
      // Sử dụng Web Speech API (free, không cần API key)
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = "vi-VN"
        utterance.rate = 0.9
        utterance.pitch = 1

        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        window.speechSynthesis.speak(utterance)
      } else {
        // Fallback to API nếu cần
        const response = await fetch("/api/flashcards/speak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        })

        if (response.ok) {
          const audioBlob = await response.blob()
          const audioUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioUrl)
          audio.onended = () => setIsSpeaking(false)
          await audio.play()
        }
      }
    } catch (error) {
      console.error("Error speaking:", error)
      setIsSpeaking(false)
    }
  }

  return {
    speakText,
    isSpeaking,
  }
}

