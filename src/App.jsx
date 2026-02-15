import { useState } from "react"
import ChatWindow from "./components/ChatWindow"
import PromptInput from "./components/PromtInput"

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "This is a fake AI response for: " + userMessage.content
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "250px",
          background: "#111",
          color: "#fff",
          padding: "20px"
        }}
      >
        <h2>DevMate AI</h2>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatWindow messages={messages} isLoading={isLoading} />
        <PromptInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default App
