import { z } from "zod";
import axios from "axios";
import { AI_MODELS } from "../config/models.js";

export const chatGenerateTool = {
  name: "chat-generate",
  description: "Generate chat response",
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
    console.log("CHET AI Response===:", response);
    return response.data;
  },
};

export const chatGetSessionTool = {
  name: "chat-get-session",
  description: "Retrieve a chat session",
  inputSchema: z.object({ payload: z.any(), }),
    
  handler: async ({ modelName, payload }) => {
        const aiEndpoint = AI_MODELS[modelName];
        if (!aiEndpoint) throw new Error(`Unsupported model: ${modelName}`);
        console.log(`Sending request to ${modelName} at ${aiEndpoint}`);
        console.log("Payload:", payload);
        const response = await axios.post(aiEndpoint, { payload });
        console.log("CHET AI Response===:", response);
        return response.data;
    },
};

export const chatGetHistoryTool = {
  name: "chat-get-history",
  description: "Retrieve chat history",
  inputSchema: z.object({ session_id: z.string() }),
  handler: async ({ modelName, payload }) => {
        const aiEndpoint = AI_MODELS[modelName];
        if (!aiEndpoint) throw new Error(`Unsupported model: ${modelName}`);
        console.log(`Sending request to ${modelName} at ${aiEndpoint}`);
        console.log("Payload:", payload);
        const response = await axios.post(aiEndpoint, { payload });
        console.log("CHET AI Response===:", response);
        return response.data;
    },
};

export const chatListSessionsTool = {
  name: "chat-list-sessions",
  description: "List all chat sessions",
  inputSchema: z.object({}),
  handler: async ({modelName}) => {
     
    const aiEndpoint = AI_MODELS[modelName];
    if (!aiEndpoint) throw new Error(`Unsupported model: ${modelName}`);
    const response = await axios.get(aiEndpoint, {});
     console.log("chatListSessionsTool AI Response===:", response);
    return response.data;
  },
};

export const chatDeleteSessionTool = {
  name: "chat-delete-session",
  description: "Delete a chat session",
  inputSchema: z.object({ session_id: z.string() }),
  handler: async ({ modelName, payload }) => {
        const aiEndpoint = AI_MODELS[modelName];
        if (!aiEndpoint) throw new Error(`Unsupported model: ${modelName}`);
        console.log(`Sending request to ${modelName} at ${aiEndpoint}`);
        console.log("Payload:", payload);
        const response = await axios.delete(aiEndpoint, { payload });
        console.log("cHET AI Response===:", response);
        return response.data;
    },
};

