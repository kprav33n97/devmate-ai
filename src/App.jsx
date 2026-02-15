import { useState } from "react"
import ChatWindow from "./components/ChatWindow"
import PromptInput from "./components/PromptInput"
import { useChatApi } from "./hooks/useChatApi"

function App() {
  const [input, setInput] = useState("")
  const { messages, isLoading, sendMessage } = useChatApi()

  const handleSend = () => {
    sendMessage(input)
    setInput("")
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
