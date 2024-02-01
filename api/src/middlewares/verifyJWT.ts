import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface CustomRequest extends Request {
    user?: string
    roles?: string[]
    id?: string
}

// Interface which extends Request type
const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
    if (!ACCESS_TOKEN_KEY) {
        return res.status(500).json({
            status: 'error',
            message: 'access token key not reachable',
        })
    }

    const authHeader = req.headers.authorization || req.headers.authorization
    if (!authHeader?.startsWith('Bearer')) {
        return res
            .status(401)
            .json({ status: 'fail', message: 'Unauthorized access' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, ACCESS_TOKEN_KEY, (err: any, decoded: any) => {
        if (err) {
            return res
                .status(403)
                .json({ status: 'fail', message: 'Invalid token' })
        }
        if (!decoded) {
            return res
                .status(403)
                .json({ status: 'fail', message: 'Invalid token' })
        }

        req.user = (
            decoded as { UserInfo: { username: string } }
        ).UserInfo.username
        req.roles = (
            decoded as { UserInfo: { roles: string[] } }
        ).UserInfo.roles
        req.id = (decoded as { UserInfo: { id: string } }).UserInfo.id
        next()
    })
}

export default verifyJWT
