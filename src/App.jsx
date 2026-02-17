import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("devmate_chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatEndRef = useRef(null);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  useEffect(() => {
    localStorage.setItem("devmate_chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
    setSidebarOpen(false);
  };

  const deleteChat = (id) => {
    const updated = chats.filter((chat) => chat.id !== id);
    setChats(updated);
    if (activeChatId === id) {
      setActiveChatId(updated.length ? updated[0].id : null);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || !activeChat) return;

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          title:
            chat.messages.length === 0
              ? input.slice(0, 25)
              : chat.title,
          messages: [
            ...chat.messages,
            { role: "user", content: input.trim() },
          ],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://devmate-backend-64qf.onrender.com/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages:
              updatedChats.find((c) => c.id === activeChatId)
                .messages,
          }),
        }
      );

      const data = await res.json();

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    role: "assistant",
                    content:
                      data.reply || "No response received.",
                  },
                ],
              }
            : chat
        )
      );
    } catch {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    role: "assistant",
                    content:
                      "⚠️ Server error. Try again.",
                  },
                ],
              }
            : chat
        )
      );
    }

    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div>
          <div className="brand-desc">
            <h2>DevMate</h2>
            <p>Your lightweight AI-powered developer assistant
            built to analyze bugs, explain code, and accelerate your
            workflow.</p>
          </div>

          <button
            className="new-chat-btn"
            onClick={createNewChat}
          >
            + New Chat
          </button>

          <div className="chat-history">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${
                  chat.id === activeChatId
                    ? "active"
                    : ""
                }`}
              >
                <span
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setSidebarOpen(false);
                  }}
                >
                  {chat.title}
                </span>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteChat(chat.id)
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="main-chat">
        <div className="mobile-header">
          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          >
            ☰
          </button>
          <h2>DevMate</h2>
        </div>

        <div className="chat-box">
          {activeChat?.messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role}`}
            >
              {msg.role === "assistant" ? (
                <div className="assistant-wrapper">
                  <button
                    className="copy-message-btn"
                    onClick={() =>
                      copyToClipboard(msg.content)
                    }
                  >
                    Copy
                  </button>

                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          ))}

          {loading && (
            <div className="message assistant typing">
              Typing...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask DevMate..."
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
          />
          <button onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
