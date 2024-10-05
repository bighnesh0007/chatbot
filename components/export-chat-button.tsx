import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ExportChatButton({ messages }: { messages: Array<{ role: string; content: string }> }) {
  const handleExport = () => {
    const content = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "chat-export.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="outline" size="icon" onClick={handleExport}>
      <Download className="h-4 w-4" />
    </Button>
  )
}