import express from "express"
import healthRoute from "@/routes/health.route"

const router = express.Router()

router.use("/health", healthRoute)

export default router
