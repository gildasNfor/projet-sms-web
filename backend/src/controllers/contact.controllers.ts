import { Request, Response } from "express"
import User from "../models/user"
import Contact from "../models/contact"

export const createContact = async (req: Request, res: Response) => {
  try {
    const {
      name,
      phoneNo,
      created_by,
    }: { name: string; phoneNo: string; created_by: string } = req.body
    const newContact = new Contact({
      name,
      phoneNo,
      created_by,
      messages: [],
    })
    await newContact.save()
    return res
      .status(201)
      .json({ message: "Contact was created Successfully", newContact })
  } catch (error) {
    return res.send(error)
  }
}

export const getContacts = async (req: Request, res: Response) => {
  const { limit, offset }: { limit: string; offset: string } = req.query as any

  try {
    const arr: Array<Object> = await Contact.find({
      created_by: req.params.userId,
    })
    const pages = Math.floor(arr.length / 5) + 1
    const contacts = await Contact.find({
      created_by: req.params.userId,
    })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
    return res.status(200).json({ pages, contacts })
  } catch (error) {
    return res.send(error)
  }
}

export const getContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.contactId,
    })

    return res.status(200).json(contact)
  } catch (error) {
    return res.send(error)
  }
}

export const deleteContact = async (req: Request, res: Response) => {
  try {
    await Contact.findByIdAndRemove({ _id: req.params.id })
    return res.status(200).json({ message: "Contact deleted Successfully" })
  } catch (error) {
    return res.send(error)
  }
}
