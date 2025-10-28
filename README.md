# Dynamic Multi-Model AI Gateway (MCP Server)

## 🚀 Elevate Your AI Strategy | Live Demo Ready

This isn't just a server; it's a flexible and scalable **AI Gateway**. Built on the Model Context Protocol (MCP), it allows any application to seamlessly connect to, switch between, and manage multiple AI models from different providers.

Whether you need to A/B test different models, route queries to the most cost-effective option, or ensure high availability with automatic failover, this solution provides the central nervous system for your AI-powered features.

**This project is perfect for:**
*   **Businesses** looking to avoid vendor lock-in with a single AI provider.
*   **Developers** who need a standardized way to call different models without rewriting code.
*   **Startups** wanting to experiment with various AI models (like GPT-5, Claude, or custom fine-tuned versions) to find the best fit for their product.

---

## ✨ Key Features & Business Value

| Feature | Description | Business Value |
| :--- | :--- | :--- |
| **Multi-Model Support** | Configure and connect to any AI model with a simple API endpoint. The list of models is dynamically managed in one central place. | **Flexibility & Future-Proofing:** Easily add new, powerful models as they become available without overhauling your application's code. |
| **Dynamic Model Switching** | Your application can select which AI model to use for any given request by simply passing its name. | **Optimization & Cost Savings:** Route simple queries to cheaper models and complex ones to more powerful models on-the-fly, optimizing for performance and cost. |
| **Health Checks** | A built-in tool allows you to instantly verify if a specific AI model's API is online and responsive. | **Reliability & Resilience:** Proactively monitor the status of your AI providers. Build logic to automatically reroute traffic if a primary model goes down, ensuring your application stays online. |
| **Standardized Tooling** | Provides a clean, unified interface (`list-models`, `health-check`, `send-to-ai`) for interacting with all connected models. | **Increased Developer Productivity:** Drastically simplifies the developer experience. Instead of learning multiple SDKs, your team interacts with one consistent, easy-to-use protocol. |
| **Testable & Robust** | Comes with a suite of unit tests for core functionality, ensuring the gateway is reliable and maintainable. | **High-Quality Code:** Demonstrates a commitment to professional development practices, reducing bugs and ensuring long-term stability for your product. |

---

## 🎥 Live Demo / How to Use

This server runs via a standard I/O transport, meaning you can interact with it directly from the command line using JSON-based commands.

### 1. List Available AI Models
Find out which models are currently configured and ready to use.

**Request:**
```json
{
  "tool": "list-models",
  "input": {}
}
```

**Response:**
```json
{
  "result": ["GPT5", "CustomModel"]
}
```

### 2. Check a Model's Health
Verify that a specific model is online before sending a critical request.

**Request:**
```json
{
  "tool": "health-check",
  "input": {
    "modelName": "CustomModel"
  }
}
```

**Response (Success):**
```json
{
  "result": { "status": "ok", "details": { "message": "Service is healthy" } }
}
```

### 3. Send a Request to an AI Model
The core function. Send any payload to the model of your choice.

**Request:**
```json
{
  "tool": "send-to-ai",
  "input": {
    "modelName": "CustomModel",
    "payload": {
      "query": "What are the benefits of a multi-model AI strategy?"
    }
  }
}
```

**Response:**
```json
{
  "result": {
    "reply": "A multi-model AI strategy prevents vendor lock-in, optimizes costs, and improves application resilience by allowing dynamic switching and failover between providers."
  }
}
```

---

## 🛠️ Technical Stack

*   **Backend:** Node.js (v20+)
*   **Framework:** MCP SDK (`@modelcontextprotocol/sdk`) for a standardized, tool-based architecture.
*   **API Client:** Axios for robust HTTP communication with external AI services.
*   **Schema & Validation:** Zod for type-safe input validation.
*   **Testing:** Mocha, Chai, and Sinon for comprehensive unit testing and mocking.
*   **Package Management:** pnpm

---

## ⚙️ Getting Started (For Technical Review)

### Prerequisites

*   Node.js (>=20)
*   pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd mcp-server
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Configuration

AI model endpoints are defined in `src/config/models.js`. For production, it's recommended to set these using environment variables:

```javascript
// src/config/models.js
export const AI_MODELS = {
  GPT5: process.env.GPT5_URL || "http://localhost:6000/gpt5",
  CustomModel: process.env.CUSTOM_URL || "https://api-dev.v8x.de/api/ai/search/text",
};
```

### Running the Server

*   **Development Mode (with auto-reload):**
    ```bash
    pnpm run dev
    ```
*   **Production Mode:**
    ```bash
    pnpm run start
    ```

### Running Tests

Execute the full suite of unit tests to ensure all tools function as expected:
```bash
pnpm test
```