import { TextGenerationType } from "@/common/types/text-generation.type"
import { z } from "zod"

export const textGenerationSchema = z.object({
  prompt: z.string().min(1).max(2000),
  type: z.enum([TextGenerationType.FIX_GRAMMAR, TextGenerationType.FIX_COMMIT_MESSAGE]).optional(),
})
