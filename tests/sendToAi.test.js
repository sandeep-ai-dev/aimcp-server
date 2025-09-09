import { expect } from "chai";
import axios from "axios";
import { searchTextTool,searchEmbeddingTool } from "../src/tools/searchTools.js";

// Mock axios
import sinon from "sinon";
const baseUrl = process.env.CUSTOM_URL || "https://api-dev.v8x.de/api"


describe("searchTextTool", () => {
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
      await searchTextTool.handler({
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

    const result = await searchTextTool.handler({
      modelName: "SearchModel",
      payload: mockPayload,
    });

    expect(postStub.calledOnce).to.be.true;
    expect(postStub.firstCall.args[0]).to.equal(`${baseUrl}/ai/search/text`);
    expect(result).to.deep.equal(mockResponse);
  });
});
 
describe("searchEmbeddingTool", () => {
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
      await searchTextTool.handler({
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

    const result = await searchTextTool.handler({
      modelName: "SearchModel",
      payload: mockPayload,
    });

    expect(postStub.calledOnce).to.be.true;
    expect(postStub.firstCall.args[0]).to.equal(`${baseUrl}/ai/search/text`);
    expect(result).to.deep.equal(mockResponse);
  });
});
 