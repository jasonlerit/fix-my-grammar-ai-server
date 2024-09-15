import { CronJob } from "cron"

const job = new CronJob(
  "*/5 * * * * *",
  async function () {
    await fetch(`${process.env.BASE_URL}/health`)
  },
  null,
  true
)
