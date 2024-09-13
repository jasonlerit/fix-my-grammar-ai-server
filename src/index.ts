import "dotenv/config"
import express, { type Application } from "express"
import routes from "@/routes"

const app: Application = express()

app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use("/api/v1", routes)

const PORT = process.env.PORT ?? 5000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️ Server is running on ${PORT}`)
})
