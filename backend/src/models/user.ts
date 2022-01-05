import mongoose, { Schema } from "mongoose"
import { UserInterface } from "src/utils/interfaces"

const userSchema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: false,
  },
})

export default mongoose.model<UserInterface>("User", userSchema)
