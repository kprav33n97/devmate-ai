import { useState } from "react"
import { useChatApi } from "./hooks/useChatApi"
import ChatWindow from "./components/ChatWindow"
import PromptInput from "./components/PromptInput"

function App() {
  const [input, setInput] = useState("")
  const { messages, isLoading, error, sendMessage } = useChatApi()

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
        {error && (
  <div
    style={{
      background: "#ffdddd",
      color: "#900",
      padding: "10px",
      textAlign: "center"
    }}
  >
    {error}
  </div>
)}

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
