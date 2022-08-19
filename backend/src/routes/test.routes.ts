import express from "express"
import multer from "multer"
import { checkJWT } from "../middleware/auth.middleware"
import {
  createNewLabTest,
  getTests,
  getTestImage,
} from "../controllers/test.controllers"

const router = express.Router()
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "uploads/")
  },
  filename: function (req: any, file: any, cb: any) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

// router.use(checkJWT)

router.post("/test", upload.single("image"), createNewLabTest)
router.get("/test/:categoryId", getTests)
router.get("/test/uploads/:image", getTestImage)

export default router
