import express from "express"
import * as TextGenerationController from "@/controllers/text-generation.controller"

const router = express.Router()

router.get("/", TextGenerationController.index)

export default router
