// src/server.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import express from "express"
import bodyParser from "body-parser"
import { tools } from "./tools/index.js"

export async function createServer(port = 4000) {
  const server = new McpServer({
    name: "multi-model-mcp",
    version: "1.0.0",
  })

  // Register tools with MCP server (for copilots/stdio)
  tools.forEach((tool) => {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema,
      },
      tool.handler
    )
  })

  // 1️⃣ Start stdio transport (MCP integration)
  const stdioTransport = new StdioServerTransport()
  server.connect(stdioTransport).then(() => {
    console.log(
      `✅ MCP server (stdio) running with tools: ${tools.map((t) => t.name).join(", ")}`
    )
  })

  // 2️⃣ Start Express server (HTTP access)
  const app = express()
  app.use(bodyParser.json())

  // Health check
  app.get("/health", (req, res) => {
    res.json({ status: "ok", tools: tools.map((t) => t.name) })
  })

  // Run tool via HTTP
  app.post("/run-tool", async (req, res) => {
    try {
      const { toolName, input } = req.body
      if (!toolName) {
        return res.status(400).json({ error: "Missing toolName" })
      }

      // Find tool
      const tool = tools.find((t) => t.name === toolName)
      console.log("-----------------",tools)
      console.log("tool=============", tool)
      if (!tool) {
        return res.status(404).json({ error: `Tool not found: ${toolName}` })
      }

      // Call handler directly
      const result = await tool.handler(input || {})
      res.json(result)
    } catch (err) {
      console.error("❌ Error running tool:", err)
      res.status(500).json({ error: err.message })
    }
  })

  app.listen(port, () => {
    console.log(`✅ HTTP server running at http://localhost:${port}`)
  })
}
