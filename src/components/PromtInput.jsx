function PromptInput({ input, setInput, handleSend, isLoading }) {
  return (
    <div
      style={{
        padding: "15px",
        borderTop: "1px solid #ddd"
      }}
    >
      <input
        type="text"
        placeholder="Ask DevMate..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%", padding: "10px" }}
      />
      <button
        onClick={handleSend}
        disabled={isLoading}
        style={{ padding: "10px 15px" }}
      >
        {isLoading ? "Thinking..." : "Send"}
      </button>
    </div>
  )
}

export default PromptInput
