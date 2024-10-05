import { ChatInterfaceProvider } from "@/components/chat-interface"
import { BackgroundAnimation } from "@/components/background-animation"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen">
        <BackgroundAnimation />
        <div className="container mx-auto p-4 relative z-10">
          <ChatInterfaceProvider />
        </div>
      </div>
    </ThemeProvider>
  )
}