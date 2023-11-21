import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

interface CustomRequest extends Request {
  user?: string
  roles?: string[]
}

// Interface which extends Request type
const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.authorization
  if (!authHeader?.startsWith("Bearer")) {
    return res.sendStatus(401)
  }

  const token = authHeader.split(" ")[1]

  console.log("token", token)

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_KEY as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" })
      }
      if (!decoded) {
        return res.sendStatus(403)
      }

      req.user = (
        decoded as { UserInfo: { username: string } }
      ).UserInfo.username
      req.roles = (decoded as { UserInfo: { roles: string[] } }).UserInfo.roles
      next()
    }
  )
}

export default verifyJWT
