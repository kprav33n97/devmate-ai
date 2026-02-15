import { useState } from "react"

export function useChatApi() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = (input) => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulated AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "This is a fake AI response for: " + input
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  return {
    messages,
    isLoading,
    sendMessage
  }
}
