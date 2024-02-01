import { NextFunction, Request, Response } from 'express'

// this is a utiliuty function to handle asynchronous errors in Express Midelware.

const catchAsync = (
    func: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
    // It returns the promise of the function passed
    // if there is an error it will be catched and transfer to error middleware

    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err) => next(err))
    }
}

export default catchAsync
