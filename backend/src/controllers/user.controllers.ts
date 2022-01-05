import { Request, Response } from "express"
import User from "../models/user"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
      return res.status(403).json({
        message:
          "A user with this username already exist. Use a different username",
      })
    }
    const userEmail = await User.findOne({ email: req.body.email })
    if (userEmail) {
      return res.status(403).json({
        message:
          "A user with this Email already exist. Use a different Email Address",
      })
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      phoneNo: req.body.phoneNo && req.body.phoneNo,
    })
    await newUser.save()

    return res.status(201).json({
      user: {
        userId: newUser._id,
        username: newUser.username,
        phoneNo: newUser.phoneNo && newUser.phoneNo,
      },
    })
  } catch (error) {
    return res.status(403).json(error)
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    })
    if (user) {
      const userExist = await bcrypt.compare(req.body.password, user.password)
      if (userExist) {
        const token = jwt.sign(
          {
            userId: user._id,
            username: user.username,
          },
          process.env.TOKEN_SECRET as string,
          {
            expiresIn: "1d",
          }
        )
        return res
          .status(200)
          .json({ user: { userId: user._id, username: user.username }, token })
      }
      return res.status(401).send("Your password is not correct")
    }
    return res.status(401).send("Your username is not correct")
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
}

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const authorization = req.headers.authorization.split(" ")[1]

      const user = await jwt.verify(
        authorization,
        process.env.TOKEN_SECRET as string
      )
      if (user) {
        return res.status(200).json({ user })
      }
      return res.status(400).send("User does not exist")
    }
    return res.sendStatus(401)
  } catch (error) {
    return res.send(error)
  }
}

export const sendEmailToResetPassword = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body
  const { _id } = (await User.findOne({ email })) as any
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: "enspygi2023@gmail.com",
      pass: process.env.RANDOM,
    },
    secure: true,
  })

  const mailData = {
    from: "enspygi2023@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Reset Your Password",
    text: "Click on the link below to reset your password",
    html: `<p>Click on the link below to reset your password</p><a href=http://localhost:4200/reset-password/${_id}> Reset my password</a>`,
  }

  try {
    const info = await transporter.sendMail(mailData)
    console.log(info)
  } catch (error) {
    console.log(error)
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { password: bcrypt.hashSync(req.body.newPassword, 10) }
    )
  } catch (error) {
    console.log(error)
  }
}
