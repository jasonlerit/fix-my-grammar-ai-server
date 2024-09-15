import "dotenv/config"
import express, { type Application } from "express"
import cors from "cors"
import morgan from "morgan"
import routes from "@/routes"
import logger from "@/utils/logger"
import "@/utils/cron"

const app: Application = express()

app.use(cors())
app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(
  morgan("dev", {
    stream: {
      write: (message: string) => {
        logger.info(message.trim())
      },
    },
  })
)

app.use("/api/v1", routes)

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️ Server is running on ${PORT}`)
})
