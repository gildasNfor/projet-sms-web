import { Request, Response } from "express"
import User from "../models/user"
import Contact from "../models/contact"
import { ContactInterface, MessageInterface } from "../utils/interfaces"

export const saveMessage = async (req: Request, res: Response) => {
  try {
    const message: MessageInterface = {
      content: req.body.message,
      sent_on: new Date(),
    }
    const receiver: any = await Contact.findOne({
      _id: req.body.contactId,
    })
    const { messages } = receiver
    await Contact.findByIdAndUpdate(
      { _id: req.body.contactId },
      {
        messages: [...messages, message],
      }
    )

    return res.status(200).json({ message: "Message created successfully" })
  } catch (error) {
    return res.send(error)
  }
}

export const getMessages = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.contactId })
    if (contact) {
      return res.status(200).json(contact.messages)
    }
    return res.sendStatus(404)
  } catch (error) {
    return res.send(error)
  }
}
