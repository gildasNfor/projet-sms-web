import express from "express"
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
} from "../controllers/contact.controllers"
import { checkJWT } from "../middleware/auth.middleware"

const router = express.Router()

router.use(checkJWT)

router.get("/contacts/:userId", getContacts)
router.get("/contact/:contactId", getContact)
router.post("/contacts", createContact)
router.delete("/contacts/delete/:id", deleteContact)

export default router
