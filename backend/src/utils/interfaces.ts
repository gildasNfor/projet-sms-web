import { Document } from "mongoose"

export interface UserInterface extends Document {
  username: string
  password: string
  email: string
  phoneNo?: string
}

export interface MessageInterface {
  content: string
  sent_on: Date
}

export interface ContactInterface {
  name: string
  phoneNo: string
  created_by: string
  messages: Array<MessageInterface>
  // messages: [type: MessageInterface]
}
