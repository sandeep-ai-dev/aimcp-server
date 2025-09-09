const baseUrl = process.env.CUSTOM_URL || "https://api-dev.v8x.de/api"

export const AI_MODELS = {
  GPT5: process.env.GPT5_URL || "http://localhost:6000/gpt5",

  // Base API
  HomeModel: baseUrl,

  // Health
  HealthModel: `${baseUrl}/health`,

  // Search
  SearchModel: `${baseUrl}/ai/search/text`,
  SearchEmbeddingModel: `${baseUrl}/ai/search/embedding`,
  SearchEmbeddingsGenerateModel: `${baseUrl}/ai/embeddings/generate`,

  // Chat
  chatGenerateModel: `${baseUrl}/ai/chat/generate`,
  chatGetSessionModel: `${baseUrl}/ai/chat/get-session`,
  chatGetHistoryModel: `${baseUrl}/ai/chat/get-history`,
  chatListSessionsModel: `${baseUrl}/ai/chat/list-sessions`,
  chatDeleteSessionModel: `${baseUrl}/ai/chat/delete-session`,

  // Gemini
  Gemini: process.env.GEMINI_URL || "http://localhost:6002",
}
