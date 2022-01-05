import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.routes"
import contactRoutes from "./routes/contact.routes"
import messageRoutes from "./routes/message.routes"
import smsRoutes from "./routes/sms.routes"
require("dotenv").config()

const PORT = process.env.PORT

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/sms")

  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use("/auth", userRoutes)
  app.use("", contactRoutes)
  app.use("", messageRoutes)
  app.use("", smsRoutes)

  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 4000}`)
  })
}

main().catch(err => {
  console.error(err)
})
