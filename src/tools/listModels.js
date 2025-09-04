import { z } from "zod";
import { AI_MODELS } from "../config/models.js";

export const listModelsTool = {
  name: "list-models",
  description: "Get a list of supported AI models",
  inputSchema: z.object({}),
  handler: async () => Object.keys(AI_MODELS),
};
