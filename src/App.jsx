import { useState } from "react"

function App() {
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
          Chat Messages Here
        </div>

        {/* Input */}
        <div style={{
          padding: "15px",
          borderTop: "1px solid #ddd"
        }}>
          <input 
            type="text" 
            placeholder="Ask DevMate..."
            style={{ width: "80%", padding: "10px" }}
          />
          <button style={{ padding: "10px 15px" }}>
            Send
          </button>
        </div>

      </div>
    </div>
  )
}

export default App
