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
import logger from './utils/logger'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

const origin =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://tomflix.vercel.app'

const allowCors =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader('Access-Control-Allow-Origin', origin)

        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        )
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization',
        )
        if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
        }
        return await fn(req, res, next)
    }

app.use(
    allowCors(async (req, res, next) => {
        next()
    }),
)

// const corsOptions = {
//     origin:
//         process.env.NODE_ENV === 'production'
//             ? 'https://movies-app-omega-ten.vercel.app'
//             : 'http://localhost:3000',
//     credentials: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     // preflightContinue: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['Content-Range', 'X-Content-Range'],
// }

// app.use(cors(corsOptions))

// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//     res.setHeader('Access-Control-Allow-Origin', origin)
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//     )
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
// })

console.log('origin:', origin)

app.get('/api/v1', (req: Request, res: Response) => {
    res.status(201).json('hello world')
})

// Setup Swagger documentation
swaggerSetup(app)

// Routes definition
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

app.listen(PORT, async () => {
    await databaseConnection()
    logger.info(`Server is running on http://localhost:${PORT}`)
})
