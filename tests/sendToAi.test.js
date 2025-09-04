import { expect } from "chai";
import { sendToAiTool } from "../src/tools/sendToAi.js";

describe("sendToAiTool", () => {
  const mockPayload = { text: "Hello AI!" };

  it("should throw an error for unsupported model", async () => {
    try {
      await sendToAiTool.handler({
        modelName: "UnknownModel",
        payload: mockPayload,
      });
      throw new Error("Expected error was not thrown");
    } catch (err) {
      expect(err.message).to.equal("Unsupported model: UnknownModel");
    }
  });

  it("should call axios.post and return AI response for a supported model", async () => {
    // ⚠️ Warning: This will call the real API. Make sure the endpoint is correct and accessible.
    const result = await sendToAiTool.handler({
      modelName: "CustomModel", // must exist in AI_MODELS
      payload: mockPayload,
    });

    console.log("AI Response:", result);

    // Optional: simple assertion if you know expected keys in the response
    expect(result).to.have.property("reply");
  });
});
