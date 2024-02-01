import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/userModel'
import { omit } from 'lodash'
import bcrypt from 'bcrypt'
import catchAsync from '../utils/catchAsync'
import MoviesAppError from '../utils/moviesAppError'

interface CreateUserRequestBody {
    username: string
    password: string
    roles?: number[]
    email: string
}

const createNewUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, password, roles, email } = req.body

        if (!password) {
            return next(
                new MoviesAppError(
                    'Invalid input data: Password is required field',
                    400,
                ),
            )
        }

        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10)

        const createdUser = await UserModel.create({
            username,
            password: hashedPwd,
            roles,
            email,
        })

        res.status(201).json({
            status: 'success',
            result: omit(createdUser.toJSON(), 'password'),
        })
    },
)

export default createNewUser
