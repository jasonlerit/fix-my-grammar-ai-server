import { z } from "zod"

export const textGenerationSchema = z.object({
  prompt: z.string().min(1).max(2000),
})
