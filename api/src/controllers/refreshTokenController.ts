import { Request, Response } from 'express'
import { UserModel } from '../models/userModel'
import jwt from 'jsonwebtoken'

const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies

    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || null
    const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY || null

    if (!ACCESS_TOKEN_KEY || !REFRESH_TOKEN_KEY) {
        return res
            .status(404)
            .json({ message: 'Access Token or Refresh Token issues' })
    }

    if (!cookies?.jwt) {
        return res.status(401)
    }

    const refreshToken = cookies.jwt

    const foundUser = await UserModel.findOne({ refreshToken })
    if (!foundUser) {
        return res.status(403) // forbidden
    }

    // evaluate jwt
    jwt.verify(refreshToken, REFRESH_TOKEN_KEY, (err: any, decoded: any) => {
        if (err || foundUser.username !== decoded?.username)
            return res.sendStatus(403)
        const roles = Object.values(foundUser.roles)
        const id = foundUser._id

        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id,
                    username: decoded.username,
                    roles: roles,
                },
            },
            ACCESS_TOKEN_KEY,
            { expiresIn: '1h' },
        )
        res.json({ accessToken })
    })
}

export default handleRefreshToken
