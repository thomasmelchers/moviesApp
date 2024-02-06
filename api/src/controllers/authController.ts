import { Request, Response, NextFunction } from 'express'
import { IUser, UserModel } from '../models/userModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import catchAsync from '../utils/catchAsync'
import MoviesAppError from '../utils/moviesAppError'

const authentication = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || null
        const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY || null

        const { username, password } = req.body

        if (!username || !password) {
            return next(
                new MoviesAppError('Username and password are required.', 400),
            )
        }

        const foundUser: IUser | null = await UserModel.findOne({
            username,
        }).exec()

        if (!foundUser) {
            return next(new MoviesAppError('Invalid credentials', 401))
        }

        let passwordMatch = await bcrypt.compare(password, foundUser.password)

        if (!foundUser || !passwordMatch) {
            return next(new MoviesAppError('Credentials are not valid!', 401)) // No content
        }

        if (passwordMatch) {
            const roles = Object.values(foundUser.roles).filter(Boolean)
            const id = foundUser._id

            if (!ACCESS_TOKEN_KEY || !REFRESH_TOKEN_KEY) {
                return next(new MoviesAppError('Token issues', 419))
            }

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id,
                        username,
                        roles: roles,
                    },
                },
                ACCESS_TOKEN_KEY,
                {
                    expiresIn: '1h',
                },
            )

            const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_KEY, {
                expiresIn: '1d',
            })

            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken
            const result = await foundUser.save()

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000,
            })

            // Send authorization roles and access token to user
            res.status(200).json({ id, username, accessToken })
        }
    },
)

export default authentication
