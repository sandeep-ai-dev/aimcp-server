import { z } from "zod";
import { AI_MODELS } from "../config/models.js";
import axios from "axios";

export const healthCheckTool = {
  name: "health-check",
  description: "Check if a specific AI model is reachable",
  inputSchema: z.object({
    modelName: z.string(),
  }),
  handler: async ({ modelName }) => {
    const aiEndpoint = AI_MODELS[modelName];
    if (!aiEndpoint) throw new Error(`Unsupported model: ${modelName}`);

    try {
      const res = await axios.get(`${aiEndpoint}/health`);
      return { status: "ok", details: res.data };
    } catch (err) {
      return { status: "error", message: err.message };
    }
  },
};
