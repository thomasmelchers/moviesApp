import { NextFunction, Request, Response } from 'express'
import MoviesAppError from '../utils/moviesAppError'

const developmentError = (res: Response, error: MoviesAppError) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        //stackTrace: error.stack,
        error: error,
    })
}

const castErrorHandler = (error: any) => {
    const message = `Invalid value for ${error.path}: ${error.path}`
    return new MoviesAppError(message, 400)
}

const duplicateKeyErrorHandler = (error: any) => {
    const message = `The ${Object.keys(
        error.keyValue,
    )}'s field is already taken with the ${Object.values(
        error.keyValue,
    )}'s value. Please use something else!`

    return new MoviesAppError(message, 400)
}

const validationErrorHandler = (error: any) => {
    const errors = Object.values(error.errors).map((val: any) => val.message)
    const errorMessages = errors.join('. ')
    const message = `Invalid input data: ${errorMessages}`

    return new MoviesAppError(message, 400)
}

const productiontError = (res: Response, error: MoviesAppError) => {
    // Send only operational errors
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        })
    } else {
        // other errors
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later. ',
        })
    }
}

const errorHandler = (
    error: MoviesAppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        developmentError(res, error)
    } else if (process.env.NODE_ENV === 'production') {
        if (error.name === 'CastError') {
            error = castErrorHandler(error)
        }
        if (error.code === 11000) error = duplicateKeyErrorHandler(error)
        if (error.name === 'ValidationError')
            error = validationErrorHandler(error)
        productiontError(res, error)
    }
}

export default errorHandler
