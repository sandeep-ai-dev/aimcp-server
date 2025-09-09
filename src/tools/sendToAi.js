// src/tools/sendToAiTool.js
import { z } from "zod"
import { AI_MODELS } from "../config/models.js"
import axios from "axios"

export const sendToAiTool = {
  name: "send-to-ai",
  description: "Send request to a selected AI model",
  inputSchema: z.object({
    modelName: z.string(),   // e.g. GPT5, Gemini, Claude
    payload: z.any(),        // your query object
  }),
  handler: async ({ modelName, payload }) => {
    const aiEndpoint = AI_MODELS[modelName]
    if (!aiEndpoint) throw new Error(`Unsupported model: ${modelName}`)

    console.log(`➡️ Sending request to ${modelName} at ${aiEndpoint}`)
    console.log("📦 Payload:", payload)

    const response = await axios.post(aiEndpoint, payload)
    return response.data
  },
}
