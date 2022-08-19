import express from "express"
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
} from "../controllers/category.controllers"
import { checkJWT } from "../middleware/auth.middleware"

const router = express.Router()

// router.use(checkJWT)

router.get("/category/:userId", getCategories)
router.get("/category/:contactId", getCategory)
router.post("/category", createCategory)
router.delete("/category/delete/:id", deleteCategory)

export default router
