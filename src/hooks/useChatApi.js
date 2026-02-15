import { useState } from "react"

export function useChatApi() {
    const [messages, setMessages] = useState([])
    const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fakeApiCall = (input) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random failure
        const shouldFail = Math.random() < 0.2

        if (shouldFail) {
          reject("Something went wrong. Please try again.")
        } else {
          resolve("This is a fake AI response for: " + input)
        }
      }, 2000)
    })
  }

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
      const aiResponse = await fakeApiCall(input)

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiResponse
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      setError(err)
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
