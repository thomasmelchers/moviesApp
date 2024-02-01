import { NextFunction, Request, Response } from 'express'
import MoviesAppError from '../utils/moviesAppError'

const errorHandler = (
    error: MoviesAppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    })
}

export default errorHandler
