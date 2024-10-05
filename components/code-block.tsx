import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CodeBlock({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
        <code>{content}</code>
      </pre>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2"
        onClick={copyToClipboard}
      >
        {isCopied ? (
          <Check className={cn("h-4 w-4", isCopied && "text-green-500")} />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}