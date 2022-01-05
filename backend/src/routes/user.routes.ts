import express from "express"
import {
  getUser,
  login,
  register,
  sendEmailToResetPassword,
  resetPassword,
} from "../controllers/user.controllers"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/get-user", getUser)
router.post("/forgot-password", sendEmailToResetPassword)
router.post("/reset-password/:userId", resetPassword)

export default router
