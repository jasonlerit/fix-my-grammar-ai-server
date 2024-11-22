import { FIX_COMMIT_MESSAGE_PROMPT, FIX_GRAMMAR_PROMPT } from "@/common/constants/prompt.constant"
import { TextGenerationType } from "@/common/types/text-generation.type"
import { textGenerationSchema } from "@/utils/text-generation.schema"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { type Request, type Response } from "express"
import { ZodError } from "zod"

export const index = async (req: Request, res: Response) => {
  try {
    textGenerationSchema.parse(req.body)

    const { prompt, type } = req.body

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY ?? "")
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: getPrompt(type as TextGenerationType),
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

const getPrompt = (type = TextGenerationType.FIX_GRAMMAR) => {
  if (type === TextGenerationType.FIX_COMMIT_MESSAGE) {
    return FIX_COMMIT_MESSAGE_PROMPT
  }
  return FIX_GRAMMAR_PROMPT
}
