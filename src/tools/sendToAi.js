import axios from "axios";
import { z } from "zod";
import { AI_MODELS } from "../config/models.js";

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

    // Send payload directly
    const { data } = await axios.post(aiEndpoint, payload, {
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    return data; // return only the JSON response
  },
};
