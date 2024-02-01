import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { databaseConnection } from './config/database'
import { swaggerSetup } from './swagger'
import registerRoutes from './routes/registerRoutes'
import authenticationRoutes from './routes/authenticationRoutes'
import logoutRoutes from './routes/logoutRoutes'
import refreshTokenRoutes from './routes/refrershToken'
import usersRoutes from './routes/usersRoutes'
import verifyJWT from './middlewares/verifyJWT'
import MoviesAppError from './utils/moviesAppError'
import errorHandler from './controllers/errorController'
import testRoutes from './routes/testRoutes'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
console.log('client:', process.env.CLIENT_URL, 'port:', process.env.PORT)

const allowCors =
    (fn: (req: Request, res: Response) => Promise<void>) =>
    async (req: Request, res: Response) => {
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader(
            'Access-Control-Allow-Origin',
            'https://movies-app-omega-ten.vercel.app',
        )
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        )
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
        )
        if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
        }
        return await fn(req, res)
    }

const handler = async (req: Request, res: Response): Promise<void> => {
    const d = new Date()
    res.end(d.toString())
}

app.use(allowCors(handler))
// app.use(
//     cors({
//         origin:
//             process.env.NODE_ENV === 'production'
//                 ? process.env.CLIENT_URL
//                 : 'http://localhost:3000',
//         credentials: true,
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         preflightContinue: true,
//         allowedHeaders: ['Content-Type', 'Authorization'],
//         exposedHeaders: ['Content-Range', 'X-Content-Range'],
//     }),
// )
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/test', testRoutes)

// Setup Swagger documentation
swaggerSetup(app)

// Define your routes
app.use('/api/v1/register', registerRoutes)
app.use('/api/v1/authentication', authenticationRoutes)
app.use('/api/v1/logout', logoutRoutes)
app.use('/api/v1/refreshToken', refreshTokenRoutes)

app.use(verifyJWT)
app.use('/api/v1/users', usersRoutes)

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    next(
        new MoviesAppError(`Can't find ${req.originalUrl} on this server`, 404),
    )
})

app.use(errorHandler)

console.log(process.env.NODE_ENV)

app.listen(PORT, async () => {
    await databaseConnection()
    console.log(`Server is running on http://localhost:${PORT}`)
})
