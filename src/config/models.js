export const AI_MODELS = {
  GPT5: process.env.GPT5_URL ||  "http://localhost:6000/gpt5",
  HomeModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api",
  HealthModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/health",
  SearchModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/search/text",
  SearchEmbeddingModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/search/embedding",
  SearchEmbeddingsGenerateModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/embeddings/generate",
  chatGenerateModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/chat/generate",
  chatGetSessionModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/chat/get-session",
  chatGetHistoryModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/chat/get-history",
  chatListSessionsModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/chat/list-sessions",
  chatDeleteSessionModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/chat/delete-session", 
  Gemini: process.env.GEMINI_URL || "http://localhost:6002" 
};
 