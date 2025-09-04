import { expect } from "chai";
import axios from "axios";
import { sendToAiTool } from "../src/tools/sendToAi.js";

// Mock axios
import sinon from "sinon";

describe("sendToAiTool", () => {
  const mockPayload = { userQuery: "Hello AI!" };
  const mockResponse = { reply: "Hello User!" };
  let postStub;

  beforeEach(() => {
    postStub = sinon.stub(axios, "post");
  });

  afterEach(() => {
    postStub.restore();
  });

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

  it("should call axios.post and return AI response for supported model", async () => {
    postStub.resolves({ data: mockResponse });

    const result = await sendToAiTool.handler({
      modelName: "CustomModel",
      payload: mockPayload,
    });

    expect(postStub.calledOnce).to.be.true;
    expect(postStub.firstCall.args[0]).to.equal("https://api-dev.v8x.de/api/ai/search/text");
    expect(result).to.deep.equal(mockResponse);
  });
});
