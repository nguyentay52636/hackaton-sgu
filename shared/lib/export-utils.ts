import type { TranscriptSegment, ChatMessage } from "@/apis/types"

export function exportToText(segments: TranscriptSegment[]): string {
  return segments.map((seg) => seg.text).join("\n\n")
}

export function exportChatToText(messages: ChatMessage[]): string {
  return messages
    .map((msg) => {
      const role = msg.role === "user" ? "Bạn" : "Trợ lý AI"
      const time = msg.timestamp.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      })
      return `[${time}] ${role}:\n${msg.content}\n`
    })
    .join("\n")
}

export function exportToPDF(title: string, content: string, filename: string): void {
  // For PDF generation, you would typically use a library like jsPDF
  // For now, we'll export as text with a .pdf extension suggestion
  const blob = new Blob([content], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function downloadFile(content: string, filename: string, type = "text/plain"): void {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
