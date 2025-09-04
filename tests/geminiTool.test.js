import { expect } from "chai"
import { geminiTool } from "../src/tools/geminiTool.js"
import axios from "axios"

describe("geminiTool", () => {
  const mockPayload = { userQuery: "Hello AI!" }
  const mockResponse = { reply: "Hello User!" }

  beforeEach(() => {
    delete process.env.GEMINI_URL // reset before each test
  })

  it("should throw an error if Gemini endpoint is missing", async () => {
    try {
      await geminiTool.handler({ model: "gemini-2.0-flash", payload: mockPayload })
      throw new Error("Expected error not thrown")
    } catch (err) {
      expect(err.message).to.include("Gemini endpoint not configured")
    }
  })

  it("should call axios.post and return Gemini AI response", async () => {
    process.env.GEMINI_URL = "http://fake-gemini-endpoint"
    axios.post = async () => ({ data: mockResponse }) // mock axios

    const result = await geminiTool.handler({
      model: "gemini-2.0-flash",
      payload: mockPayload,
    })

    expect(result).to.deep.equal(mockResponse)
  })
})
