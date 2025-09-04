import { sendToAiTool } from "./sendToAi.js";
import { listModelsTool } from "./listModels.js";
import { healthCheckTool } from "./healthCheck.js";

export const tools = [sendToAiTool, listModelsTool, healthCheckTool];
