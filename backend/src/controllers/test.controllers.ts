import { Request, Response } from "express"
import User from "../models/user"
import Category from "../models/category"
import fs from "fs"
import {
  CategoryInterface,
  LabTestInterface,
  MulterRequest,
} from "../utils/interfaces"
import category from "../models/category"

export const createNewLabTest = async (req: Request, res: Response) => {
  console.log((req as unknown as MulterRequest).file)
  console.log(req.body)

  try {
    const test = {
      name: req.body.name,
      description: req.body.description,
      image: (req as unknown as MulterRequest).file.originalname,
      imagePath: (req as unknown as MulterRequest).file.path,
      price: req.body.price,
    }
    const category: any = await Category.findOne({
      _id: req.body.categoryId,
    })
    const { lab_tests: testArray } = category
    await Category.findByIdAndUpdate(
      { _id: req.body.categoryId },
      {
        lab_tests: [...testArray, test],
      }
    )

    return res.status(200).json({ message: "Test created successfully", test })
  } catch (error) {
    return res.send(error)
  }
}

export const getTests = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOne({ _id: req.params.contactId })
    if (category) {
      return res.status(200).json(category.lab_tests)
    }
    return res.sendStatus(404)
  } catch (error) {
    return res.send(error)
  }
}

export const getTestImage = (req: Request, res: Response) => {
  console.log(req.params.image)
  const file: fs.ReadStream = fs.createReadStream("uploads/" + req.params.image)
  const { size } = fs.statSync("uploads/" + req.params.image)
  console.log(size)

  const head = {
    //  "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": size,
    "Content-Type": "image/jpeg",
  }
  res.writeHead(206, head)
  file.pipe(res)
}
