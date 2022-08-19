import { Request, Response } from "express"
import User from "../models/user"
import Category from "../models/category"

export const createCategory = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
    }: { name: string; phoneNo: string; description: string } = req.body
    const newCategory = new Category({
      name,
      description,
      lab_tests: [],
    })
    await newCategory.save()
    return res
      .status(201)
      .json({ message: "Category was created Successfully", newCategory })
  } catch (error) {
    return res.send(error)
  }
}

export const getCategories = async (req: Request, res: Response) => {
  const { limit, offset }: { limit: string; offset: string } = req.query as any

  try {
    const arr: Array<Object> = await Category.find({
      created_by: req.params.userId,
    })
    const pages = Math.floor(arr.length / 5) + 1
    const category = await Category.find({
      created_by: req.params.userId,
    })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
    return res.status(200).json({ pages, category })
  } catch (error) {
    return res.send(error)
  }
}

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOne({
      _id: req.params.contactId,
    })

    return res.status(200).json(category)
  } catch (error) {
    return res.send(error)
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndRemove({ _id: req.params.id })
    return res.status(200).json({ message: "Category deleted Successfully" })
  } catch (error) {
    return res.send(error)
  }
}
