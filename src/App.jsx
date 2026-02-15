import { useState } from "react"

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage = {
      id: Date.now(),
      role: "user",
      content: input
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "#111",
        color: "#fff",
        padding: "20px"
      }}>
        <h2>DevMate AI</h2>
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }}>
        
        {/* Messages */}
        <div style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto"
        }}>
          {messages.map(msg => (
            <div 
              key={msg.id}
              style={{
                marginBottom: "10px",
                textAlign: msg.role === "user" ? "right" : "left"
              }}
            >
              <span style={{
                background: msg.role === "user" ? "#007bff" : "#eee",
                color: msg.role === "user" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "8px"
              }}>
                {msg.content}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: "15px",
          borderTop: "1px solid #ddd"
        }}>
          <input 
            type="text" 
            placeholder="Ask DevMate..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "80%", padding: "10px" }}
          />
          <button 
            onClick={handleSend}
            style={{ padding: "10px 15px" }}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  )
}

export default App
