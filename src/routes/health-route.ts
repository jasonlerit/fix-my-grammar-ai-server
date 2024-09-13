import express from "express"
import * as HealthController from "@/controllers/health-controller"

const router = express.Router()

router.get("/", HealthController.index)

export default router
