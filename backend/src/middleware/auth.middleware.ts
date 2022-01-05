import jwt from "jsonwebtoken"
import { Request, Response } from "express"

export const checkJWT = (req: any, res: any, next: () => void) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          console.log(err)
          return res.sendStatus(403)
        }

        req.user = user
        next()
      }
    )
  } else {
    res.sendStatus(401)
  }
}
