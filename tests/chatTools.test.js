import { expect } from "chai";
import axios from "axios";
import { chatGenerateTool,chatListSessionsTool,chatGetSessionTool  } from "../src/tools/chatTools.js";

// Mock axios
import sinon from "sinon";
 

describe("chatGenerateTool", () => {
  const mockPayload = { "query": "add 4 and 18", "key": "",  "is_folder": false, "session_id": ""  };
  const mockResponse = { reply: "The sum of 4 and 18 is **22**.\n\n(4 + 18 = 22)" };
  let postStub;

  beforeEach(() => {
    postStub = sinon.stub(axios, "post");
  });

  afterEach(() => {
    postStub.restore();
  });

  it("should throw an error for unsupported model", async () => {
    try {
      await chatGenerateTool.handler({
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

    const result = await chatGenerateTool.handler({
      modelName: "chatGenerateModel",
      payload: mockPayload,
    });

    expect(postStub.calledOnce).to.be.true;
    expect(postStub.firstCall.args[0]).to.equal("https://api-dev.v8x.de/api/ai/chat/generate");
     expect(result).to.deep.equal(mockResponse);
  });
});

describe("chatListSessionsTool", () => {
  //const mockPayload = { "query": "add 4 and 18", "key": "",  "is_folder": false, "session_id": ""  };
  const mockResponse = { reply: "The sum of 4 and 18 is **22**.\n\n(4 + 18 = 22)" };
  let postStub;

  beforeEach(() => {
    postStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    postStub.restore();
  });

  it("should throw an error for unsupported model", async () => {
    try {
      await chatListSessionsTool.handler({
        modelName: "UnknownModel",
         
      });
      throw new Error("Expected error was not thrown");
    } catch (err) {
      expect(err.message).to.equal("Unsupported model: UnknownModel");
    }
  });

  it("should call axios.post and return AI response for supported model", async () => {
    postStub.resolves({ data: mockResponse });

    const result = await chatListSessionsTool.handler({
      modelName: "chatListSessionsModel",
       
    });

    expect(postStub.calledOnce).to.be.true;
    expect(postStub.firstCall.args[0]).to.equal("https://api-dev.v8x.de/api/ai/chat/list-sessions");
     expect(result).to.deep.equal(mockResponse);
  });
});

describe("chatGetSessionTool", () => {
  const mockPayload = { };
  const mockResponse = { reply: "The sum of 4 and 18 is **22**.\n\n(4 + 18 = 22)" };
  let postStub;

  beforeEach(() => {
    postStub = sinon.stub(axios, "post");
  });

  afterEach(() => {
    postStub.restore();
  });

  it("should throw an error for unsupported model", async () => {
    try {
      await chatGetSessionTool.handler({
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

    const result = await chatGetSessionTool.handler({
      modelName: "chatGetSessionModel",
      payload: mockPayload,
    });

    expect(postStub.calledOnce).to.be.true;
    expect(postStub.firstCall.args[0]).to.equal("https://api-dev.v8x.de/api/ai/chat/get-session");
     expect(result).to.deep.equal(mockResponse);
  });
});