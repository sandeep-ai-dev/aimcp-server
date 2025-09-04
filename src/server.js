// src/server.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Import all tools dynamically
import { tools } from "./tools/index.js";

export async function createServer() {
  const server = new McpServer({
    name: "multi-model-mcp",
    version: "1.0.0",
  });

  // Register all tools
  tools.forEach((tool) => {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema,
      },
      tool.handler
    );
  });

  // Connect to stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log(
    `✅ MCP server running via stdio transport with tools: ${tools
      .map((t) => t.name)
      .join(", ")}`
  );
}
