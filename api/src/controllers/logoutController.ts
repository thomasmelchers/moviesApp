import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/userModel'
import catchAsync from '../utils/catchAsync'
import MoviesAppError from '../utils/moviesAppError'

// Delete refreshToken - need to remove accessToken in Front end
const logout = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const cookies = req.cookies
        if (!cookies?.jwt) {
            return next(new MoviesAppError('', 204)) // No content
        }

        const refreshToken = cookies.jwt

        // Is refreshToken in db?
        const foundUser = await UserModel.findOne({ refreshToken }).exec()
        if (!foundUser) {
            res.clearCookie('jwt', {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            return next(new MoviesAppError('', 204)) // No content
        }

        // Delete refreshToken in db
        foundUser.refreshToken = ''
        const result = await foundUser.save()

        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
        res.status(204).json({
            message: `${foundUser.username} has been logged out!`,
        })
    },
)

export default logout
