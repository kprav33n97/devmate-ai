import MessageBubble from "./MessageBubble"

function ChatWindow({ messages, isLoading }) {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        overflowY: "auto"
      }}
    >
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {isLoading && (
        <div style={{ marginBottom: "10px", textAlign: "left" }}>
          <span
            style={{
              background: "#eee",
              padding: "8px 12px",
              borderRadius: "8px"
            }}
          >
            DevMate is typing...
          </span>
        </div>
      )}
    </div>
  )
}

export default ChatWindow
