import { Request, Response } from 'express'
import { UserModel, IUser } from '../models/userModel'
import catchAsync from '../utils/catchAsync'
import { omit } from 'lodash'
import MoviesAppError from '../utils/moviesAppError'
import { NextFunction } from 'connect'

export const getAllUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const data = await UserModel.find()

        // Converting Mongoose doc to JS object and then omit the password field
        const users = data.map((user) => omit(user.toObject(), 'password'))

        res.status(200).json({
            status: 'success',
            message: 'Users records successfully found',
            result: users,
            length: users.length,
        })
    },
)

export const getUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId: string | undefined = req.params.id

        if (!userId) {
            return next(
                new MoviesAppError('Bad request: The id is required', 400),
            )
        }

        const user = await UserModel.findById(userId)

        if (!user) {
            return next(new MoviesAppError('User record not found', 404))
        }

        return res.status(200).json({
            status: 'success',
            message: 'User record sucessfully found',
            result: omit(user?.toJSON(), 'password'),
        })
    },
)

export const updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId: string | undefined = req.params.id

        if (!userId) {
            return next(
                new MoviesAppError('Bad request: The id is required', 400),
            )
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        )

        if (!updatedUser) {
            return next(
                new MoviesAppError(
                    "This user id doesn't exist. Not possible to do the update",
                    404,
                ),
            )
        }

        return res.status(200).json({
            status: 'success',
            message: 'User record successfully update',
            result: omit(updatedUser.toJSON(), 'password'),
        })
    },
)

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const userId: string | undefined = req.params.id

    if (!userId) {
        return next(new MoviesAppError('Bad request: The id is required', 400))
    }

    const deletedUser = await UserModel.findByIdAndDelete(req.params.id)

    // if the user doesn't exist !
    if (!deletedUser) {
        return next(
            new MoviesAppError("This user record ID doesn't exist !", 404),
        )
    }

    return res.status(200).json({
        status: 'success',
        message: 'User record sucessfully deleted',
        result: 'deleted',
        deleted: omit(deletedUser?.toJSON(), 'password'),
    })
}

export const getLikesByUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId: string | undefined = req.params.id

        if (!userId) {
            return next(
                new MoviesAppError('Bad request: The id is required', 400),
            )
        }

        const user: IUser | null = await UserModel.findById(userId)

        if (!user) {
            return next(new MoviesAppError('User record not found', 404))
        }

        res.status(200).json({
            status: 'success',
            message: 'User record sucessfully found',
            result: user.likes,
        })
    },
)

export const updateMoviesLikesByUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId: string | undefined = req.params.id
        const { movieLike, productType } = req.body

        if (!userId || !movieLike || !productType) {
            return next(
                new MoviesAppError(
                    'Bad request: The user id, the movie id and product type are required',
                    400,
                ),
            )
        }

        const user: IUser | null = await UserModel.findById(userId)

        if (!user) {
            return next(new MoviesAppError('User record not found', 404))
        }

        let updatedLikes: number[] = updateLikes(
            productType === 'movie' ? user.likes.movies : user.likes.series,
            movieLike,
        )

        const updateField =
            productType === 'movie' ? 'likes.movies' : 'likes.series'

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { [updateField]: updatedLikes } },
            {
                new: true,
                runValidators: true,
            },
        )

        if (!updatedUser) {
            return next(
                new MoviesAppError(
                    "This user id doesn't exist. Not possible to do the update",
                    404,
                ),
            )
        }

        return res.status(200).json({
            status: 'success',
            message: 'User record successfully update',
            result: omit(updatedUser.toJSON(), 'password'),
        })
    },
)

const updateLikes = (likesArray: number[], productLike: number): number[] => {
    return likesArray.includes(productLike)
        ? likesArray.filter((e) => e !== productLike)
        : [...likesArray, productLike]
}
