import { Document } from "mongoose"

export interface UserInterface extends Document {
  firstName: string
  lastName: string
  password: string
  email: string
  dateOfBirth: string
  phoneNo: string
}

export interface LabTestInterface {
  name: string
  description: string
  image: String
  imagePath: String
  price: number
}

export interface CategoryInterface {
  name: string
  description: string
  lab_tests: Array<LabTestInterface>
}

export interface MulterRequest extends Request {
  file: any
}
