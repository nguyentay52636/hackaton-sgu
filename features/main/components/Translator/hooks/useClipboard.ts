import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function useClipboard() {
    const [copied, setCopied] = useState(false)
    const { toast } = useToast()

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
            title: "Đã sao chép",
            description: "Nội dung đã được sao chép",
        })
    }

    return { copied, copyToClipboard }
}

