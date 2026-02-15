import React from "react"

const MessageBubble = React.memo(({ message }) => {
  const isUser = message.role === "user"

  return (
    <div
      style={{
        marginBottom: "10px",
        textAlign: isUser ? "right" : "left"
      }}
    >
      <span
        style={{
          background: isUser ? "#007bff" : "#eee",
          color: isUser ? "#fff" : "#000",
          padding: "8px 12px",
          borderRadius: "8px",
          display: "inline-block"
        }}
      >
        {message.content}
      </span>
    </div>
  )
})

export default MessageBubble
