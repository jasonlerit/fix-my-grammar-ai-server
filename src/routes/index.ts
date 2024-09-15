import express from "express"
import healthRoute from "@/routes/health.route"
import textGenerationRoute from "@/routes/text-generation.route"

const router = express.Router()

router.use("/health", healthRoute)
router.use("/text-generation", textGenerationRoute)

export default router
