import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

const sendMessage = async () => {
  if (!input.trim()) {
    alert("Message required");
    return;
  }

  const userMessage = { role: "user", content: input.trim() };
  const updatedMessages = [...messages, userMessage];

  setMessages(updatedMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    if (!res.ok) {
      throw new Error("Server Error");
    }

    const data = await res.json();

    setMessages([
      ...updatedMessages,
      { role: "assistant", content: data.reply }
    ]);

  } catch (error) {
    console.error(error);
    setMessages([
      ...updatedMessages,
      { role: "assistant", content: "⚠️ Server error" }
    ]);
  }

  setLoading(false);
};

  return (
    <div className="app">
      <div className="chat-container">
        <h2 className="title">DevMate AI</h2>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.role === "user" ? "user" : "assistant"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="message assistant">Typing...</div>
          )}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask DevMate..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
