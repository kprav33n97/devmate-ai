import { useState } from "react"

export function useChatApi() {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (input) => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("https://devmate-backendnew.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.reply || "Server responded with error")
      }

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply || "No analysis returned."
      }

      setMessages((prev) => [...prev, aiMessage])

    } catch (err) {
      console.error("Frontend Error:", err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    isLoading,
    error,
    sendMessage
  }
}
