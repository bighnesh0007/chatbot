"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"
import { ChatMessage } from "@/components/chat-message"
import { MessageInput } from "@/components/message-input"
import { SettingsDialog } from "@/components/settings-dialog"
import { ClearChatButton } from "@/components/clear-chat-button"
import { ExportChatButton } from "@/components/export-chat-button"
import { useToast } from "@/hooks/use-toast"

export function ChatInterfaceProvider() {
  return (
    <ChatContextProvider>
      <ChatInterface />
    </ChatContextProvider>
  )
}


interface ChatContextType {
  messages: Array<{ role: string; content: string }>
  addMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

function ChatContextProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const { toast } = useToast()

  const addMessage = async (content: string) => {
    const newMessage = { role: "user", content }
    setMessages((prev) => [...prev, newMessage])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      })
      if (!response.ok) {
        throw new Error("Failed to get response from the bot")
      }
      const data = await response.json()
      setMessages((prev) => [...prev, { role: "bot", content: data.message }])
    } catch (error) {
      console.error("Error in chat API:", error)
      toast({
        title: "Error",
        description: "Failed to get a response from the bot. Please try again.",
        variant: "destructive",
      })
      setMessages((prev) => prev.slice(0, -1)) // Remove the user message if bot fails to respond
    }
  }

  const clearMessages = () => setMessages([])

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

function useChatContext() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatContextProvider")
  }
  return context
}

function ChatInterface() {
  const { messages, addMessage, clearMessages } = useChatContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async (content: string) => {
    setIsLoading(true)
    await addMessage(content)
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-[calc(100vh-2rem)] max-w-2xl mx-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gemini Chatbot</h1>
        <div className="flex space-x-2">
          <SettingsDialog />
          <ClearChatButton onClear={clearMessages} />
          <ExportChatButton messages={messages} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg border bg-card">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </div>
      <MessageInput onSend={handleSend} />
    </motion.div>
  )
}