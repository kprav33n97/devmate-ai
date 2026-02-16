import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import OpenAI from "openai"

dotenv.config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Groq client (OpenAI compatible)
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
})

app.get("/", (req, res) => {
  res.send("Groq AI Server Running 🚀")
})

app.post("/analyze", async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ reply: "Message required" })
    }

    console.log("User Message:", message)

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI code assistant. Analyze code and explain bugs clearly."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    })

    const reply = completion.choices[0].message.content

    res.json({ reply })

  } catch (error) {
    console.error("Server Error:", error)
    res.status(500).json({
      reply: "AI Server Error"
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
