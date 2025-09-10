import { createServer } from "./server.js";

createServer(5000).catch((err) => {
  console.error("❌ Failed to start MCP server:", err);
  process.exit(1);
});
