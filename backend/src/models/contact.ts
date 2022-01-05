import mongoose, { Schema } from "mongoose"
import { ContactInterface, MessageInterface } from "src/utils/interfaces"

const contactSchema = new Schema<ContactInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  created_by: { type: String, required: true },
  messages: [],
})

export default mongoose.model<ContactInterface>("Contact", contactSchema)
