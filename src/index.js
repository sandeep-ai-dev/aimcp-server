import { createServer } from "./server.js";

createServer().catch((err) => {
  console.error("❌ Failed to start MCP server:", err);
  process.exit(1);
});
