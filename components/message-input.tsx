import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { VoiceInputButton } from "@/components/voice-input-button"
import { ImageUploadButton } from "@/components/image-upload-button"
import { EmojiPicker } from "@/components/emoji-picker"

export function MessageInput({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSend(message)
      setMessage("")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-end space-x-2 mt-4"
    >
      <Textarea
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
        rows={3}
      />
      <div className="flex flex-col space-y-2">
        <VoiceInputButton onTranscript={(text) => setMessage((prev) => prev + text)} />
        <ImageUploadButton onUpload={(url) => setMessage((prev) => `${prev} ${url}`)} />
        <EmojiPicker onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji)} />
        <Button onClick={handleSend} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}