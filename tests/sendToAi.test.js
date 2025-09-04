import { sendToAiTool } from "../src/tools/sendToAi.js";
import axios from "axios";

// Mock axios to prevent real HTTP calls
jest.mock("axios");

describe("sendToAiTool", () => {
  const mockPayload = { userQuery: "Hello AI!" };
  const mockResponse = { reply: "Hello User!" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error for unsupported model", async () => {
    await expect(
      sendToAiTool.handler({ modelName: "UnknownModel", payload: mockPayload })
    ).rejects.toThrow("Unsupported model: UnknownModel");
  });

  it("should call axios.post and return AI response for supported model", async () => {
    // Mock axios.post to resolve with mockResponse
    axios.post.mockResolvedValue({ data: mockResponse });

    const result = await sendToAiTool.handler({
      modelName: "GPT5",
      payload: mockPayload,
    });

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:6000/gpt5",
      { payload: mockPayload }
    );
    expect(result).toEqual(mockResponse);
  });
});
