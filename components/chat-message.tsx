import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CodeBlock } from "@/components/code-block"

export function ChatMessage({ message }: { message: { role: string; content: string } }) {
  const isBot = message.role === "bot"

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g)
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3).trim()
        return <CodeBlock key={index} content={code} />
      }
      return <p key={index} className="text-sm whitespace-pre-wrap">{part}</p>
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div className={`flex ${isBot ? "flex-row" : "flex-row-reverse"} items-start space-x-2 max-w-[80%]`}>
        <Avatar>
          <AvatarImage src={isBot ? "/bot-avatar.png" : "/user-avatar.png"} alt={isBot ? "Bot Avatar" : "User Avatar"} />
          <AvatarFallback>{isBot ? "B" : "U"}</AvatarFallback>
        </Avatar>
        <div className={`rounded-lg p-3 ${isBot ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          {renderContent(message.content)}
        </div>
      </div>
    </motion.div>
  )
}