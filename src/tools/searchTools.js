import { z } from "zod";
import axios from "axios";
import { AI_MODELS } from "../config/models.js";

export const searchTextTool = {
  name: "search-text",
  description: "Perform text search",
  inputSchema: z.object({
    query: z.string(),
    key: z.string().optional(),
    is_folder: z.boolean().default(false),
    session_id: z.string().optional(),
  }),
  handler: async ({ query, key, is_folder, session_id }) => {
    const response = await axios.post(AI_MODELS.SearchModel, {
      query,
      key,
      is_folder,
      session_id,
    });
    return response.data;
  },
};

export const searchEmbeddingTool = {
  name: "search-embedding",
  description: "Perform embedding search",
  inputSchema: z.object({
    query: z.string(),
    key: z.string().optional(),
  }),
  handler: async ({ query, key }) => {
    const response = await axios.post(AI_MODELS.SearchEmbeddingModel, {
      query,
      key,
    });
    return response.data;
  },
};

export const generateEmbeddingTool = {
  name: "generate-embedding",
  description: "Generate embeddings for input text",
  inputSchema: z.object({ text: z.string() }),
  handler: async ({ text }) => {
    const response = await axios.post(
      AI_MODELS.SearchEmbeddingsGenerateModel,
      { text }
    );
    return response.data;
  },
};
