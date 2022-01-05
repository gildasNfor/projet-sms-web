import express from "express"
import { sendSMS } from "../controllers/sms.controllers"
import { checkJWT } from "../middleware/auth.middleware"

const router = express.Router()

router.use(checkJWT)

router.post("/send-sms", sendSMS)

export default router
