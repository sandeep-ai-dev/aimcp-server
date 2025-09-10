// src/server.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import express from "express"
import bodyParser from "body-parser"
// Import all tools dynamically
import { tools } from "./tools/index.js";

export async function createServer(port = 4000) {
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
 const app = express()
  app.use(bodyParser.json())
  

  // Simple health check
  app.get("/health", (_, res) => {
    res.json({ status: "ok", tools: tools.map((t) => t.name) })
  })

  // Run a tool
  app.post("/run-tool", async (req, res) => {
    try {
      const { toolName, input } = req.body
      const result = await server.invokeTool(toolName, input)
      res.json(result)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  app.listen(port, () => {
    console.log(`✅ MCP server running at http://localhost:${port}`)
  })
  console.log(
    `✅ MCP server running via stdio transport with tools: ${tools
      .map((t) => t.name)
      .join(", ")}`
  );
}
