import mongoose, { Schema } from "mongoose"
import { CategoryInterface } from "src/utils/interfaces"

const categorySchema = new Schema<CategoryInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  lab_tests: [],
})

export default mongoose.model<CategoryInterface>("Category", categorySchema)
