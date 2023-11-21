import { Request, Response } from "express"
import { UserModel } from "../models/userModel"
import { omit } from "lodash"

interface CreateUserRequestBody {
  username: string
  password: string
  roles?: number[]
  email: string
}

const createNewUser = async (req: Request, res: Response) => {
  const { username, password, roles, email } = req.body

  if (!username || !email || !password) {
    return res
      .status(422)
      .json({ message: "Username, password and email are required" })
  }

  const duplicateUsername = await UserModel.findOne({ username }).exec()
  if (duplicateUsername) {
    return res.status(409).json({
      message: "This username already exist! Please, find another one.",
    })
  }

  const duplicateEmail = await UserModel.findOne({ email }).exec()
  if (duplicateEmail) {
    return res
      .status(409)
      .json({ message: "An account already exists for this email." })
  }

  try {
    const createdUser = await UserModel.create({
      username,
      password,
      roles,
      email,
    })

    console.log(omit(createdUser.toJSON(), "password"))

    res.status(201).json({
      success: "New user has been created",
      result: omit(createdUser.toJSON(), "password"),
    })
  } catch (err: any) {
    res.status(500).json({ fail: "User is not created", message: err.message })
  }
}

export default createNewUser
