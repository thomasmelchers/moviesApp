import { Request, Response } from "express"
import { UserModel } from "../models/userModel"

// Delete refreshToken - need to remove accessToken in Front end
const logout = async (req: Request, res: Response) => {
  console.log("from logout backend")
  const cookies = req.cookies
  if (!cookies?.jwt) {
    return res.sendStatus(204) // No content
  }

  const refreshToken = cookies.jwt
  console.log(req.cookies)

  // Is refreshToken in db?
  const foundUser = await UserModel.findOne({ refreshToken }).exec()
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })
    return res.sendStatus(204)
  }

  // Delete refreshToken in db
  foundUser.refreshToken = ""
  const result = await foundUser.save()
  console.log(result)

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })
  res.sendStatus(204)
}

export default logout
