import mongoose, { Schema } from "mongoose"
import { UserInterface } from "src/utils/interfaces"

const userSchema = new Schema<UserInterface>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
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
  dateOfBirth: {
    type: String,
    required: true,
  },
})

export default mongoose.model<UserInterface>("User", userSchema)
