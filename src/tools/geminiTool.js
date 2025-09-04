// src/tools/geminiTool.js
import { z } from "zod"
import axios from "axios"
import { AI_MODELS } from "../config/models.js";

export const GEMINI_MODELS = [
  { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
  { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" },
  { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" },
]

export const geminiTool = {
  name: "gemini-tool",
  description: "Send request to Google Gemini models",
  inputSchema: z.object({
    model: z.enum(GEMINI_MODELS.map(m => m.value)),
    payload: z.any(),
  }),
  handler: async ({ model, payload }) => {
 console.log("model============",AI_MODELS.Gemini)
    //console.log("payload============",payload)
    

    const geminiEndpoint = process.env.GEMINI_URL || null
console.log("geminiEndpoint =======",geminiEndpoint )
    // ✅ Explicit check to prevent axios crash
    if (!geminiEndpoint) {
      throw new Error("Gemini endpoint not configured")
    }

    const response = await axios.post(geminiEndpoint, { model, payload })
   // console.log("response============",response.data)
    return response.data
  },
}
