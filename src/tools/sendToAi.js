import { z } from "zod";
import { AI_MODELS } from "../config/models.js";
import axios from "axios";

export const sendToAiTool = {
  name: "send-to-ai",
  description: "Send request to selected AI model",
  inputSchema: z.object({
    modelName: z.string(),
    payload: z.any(),
  }),
  handler: async ({ modelName, payload }) => {
    const aiEndpoint = AI_MODELS[modelName];
    if (!aiEndpoint) throw new Error(`Unsupported model: ${modelName}`);
    console.log(`Sending request to ${modelName} at ${aiEndpoint}`);
    console.log("Payload:", payload);
    const response = await axios.post(aiEndpoint, { payload });
    console.log("AI Response===:", response);
    return response.data;
  },
};
