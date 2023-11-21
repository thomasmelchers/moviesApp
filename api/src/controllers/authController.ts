import { Request, Response } from "express"
import { IUser, UserModel } from "../models/userModel"
import jwt from "jsonwebtoken"

const authentication = async (req: Request, res: Response) => {
  const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || null
  const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY || null

  console.log("access: ", ACCESS_TOKEN_KEY, "refresh: ", REFRESH_TOKEN_KEY)
  const { username, password } = req.body
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." })

  const foundUser: IUser | null = await UserModel.findOne({ username }).exec()

  const passwordMatch = foundUser
    ? await foundUser.correctPassword(password, foundUser.password)
    : null

  if (!foundUser || !passwordMatch) {
    return res.status(401).json({ message: "Credentials are not valid!" }) //Unauthorized
  }

  if (passwordMatch) {
    const roles = Object.values(foundUser.roles).filter(Boolean)

    if (!ACCESS_TOKEN_KEY || !REFRESH_TOKEN_KEY) {
      throw new Error("Access Token or Refresh Token issues")
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username,
          roles: foundUser.roles,
        },
      },
      ACCESS_TOKEN_KEY,
      {
        expiresIn: "10s",
      }
    )

    const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_KEY, {
      expiresIn: "1d",
    })

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)
    console.log(roles)

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    })

    // Send authorization roles and access token to user
    res.json({ username, accessToken })
  }
}

export default authentication
