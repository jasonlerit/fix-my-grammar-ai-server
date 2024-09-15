import { textGenerationSchema } from "@/utils/text-generation.schema"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { type Request, type Response } from "express"
import { ZodError } from "zod"

export const index = async (req: Request, res: Response) => {
  try {
    textGenerationSchema.parse(req.body)

    const { prompt } = req.body

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? "")
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `
        You are a grammar correction AI.
        Your task is to receive a user-inputted sentence or phrase, correct the grammar, and provide three alternative suggestions.
        Each suggestion should be a grammatically correct version of the original input.
        Return these suggestions in JSON format, where each suggestion is a string in an array under the key 'suggestions'.
        For example, the response should look like this: { 'suggestions': ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'] }.
      `,
    })

    const result = await model.generateContent(prompt as string)
    const text = result.response.text()

    res.json(JSON.parse(text))
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: error.formErrors,
      })
    }
    return res.status(500).json({ message: "Internal server error" })
  }
}
