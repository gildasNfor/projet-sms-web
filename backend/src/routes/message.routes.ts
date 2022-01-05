import express from "express"
import { checkJWT } from "../middleware/auth.middleware"
import { getMessages, saveMessage } from "../controllers/message.controllers"

const router = express.Router()

router.use(checkJWT)

router.post("/messages", saveMessage)
router.get("/messages/:contactId", getMessages)

export default router
