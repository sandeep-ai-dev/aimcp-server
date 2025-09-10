// src/tools/geminiTool.js
import { z } from "zod"
import { AI_MODELS } from "../config/models.js"
import axios from "axios"

export const geminiTool = {
  name: "gemini-tool",
  description: "Send a query to Google Gemini",
  inputSchema: z.object({
    query: z.string(),
  }),
  handler: async ({ query }) => {
    if (!AI_MODELS.Gemini) throw new Error("Gemini endpoint not configured")
    const response = await axios.post(AI_MODELS.Gemini, { query })
    return response.data
  },
}
