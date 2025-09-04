export const AI_MODELS = {
  GPT5: process.env.GPT5_URL ||  "http://localhost:6000/gpt5",
  CustomModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/search/text",
  Gemini: process.env.GEMINI_URL || "http://localhost:6002" 
};
 