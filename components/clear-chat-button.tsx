import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ClearChatButton({ onClear }: { onClear: () => void }) {
  return (
    <Button variant="outline" size="icon" onClick={onClear}>
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}