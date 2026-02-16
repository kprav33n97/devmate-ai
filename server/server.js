import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Root test
app.get("/", (req, res) => {
  res.send("AI Server is running 🚀")
})

// AI Route
app.post("/analyze", async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ reply: "Message is required" })
    }

    console.log("User Message:", message)

    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Analyze this code and find bugs:\n${message}`,
          parameters: {
            max_new_tokens: 200
          }
        })
      }
    )

    const text = await hfResponse.text()

    console.log("Raw HF Response:", text)

    if (!hfResponse.ok) {
      return res.status(500).json({
        reply: `HF Error: ${text}`
      })
    }

    let data
    try {
      data = JSON.parse(text)
    } catch (err) {
      return res.status(500).json({
        reply: "HF returned invalid JSON"
      })
    }

    let reply = "No response from AI"

    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text
    }

    res.json({ reply })

  } catch (error) {
    console.error("Server Error:", error)
    res.status(500).json({
      reply: "Server error occurred"
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
