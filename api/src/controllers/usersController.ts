import { Request, Response } from 'express'
import { UserModel, IUser } from '../models/userModel'
import { omit } from 'lodash'

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const data = await UserModel.find()

        // Converting Mongoose doc to JS object and then omit the password field
        const users = data.map((user) => omit(user.toObject(), 'password'))

        res.status(200).json({
            message: 'Users records successfully found',
            result: users,
            length: users.length,
        })
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
        })
    }
}

export const getUser = async (req: Request, res: Response) => {
    const userId: string | undefined = req.params.id

    if (!userId) {
        return res
            .status(400)
            .json({ error: 'Bad request: The id is required' })
        // new ErrorHandling('Bad request: The id is required', 400)
    }

    try {
        const user = await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'User record not found' })
        }

        return res.status(200).json({
            message: 'User record sucessfully found',
            result: omit(user?.toJSON(), 'password'),
        })
    } catch (error: any) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const userId: string | undefined = req.params.id

    if (!userId) {
        return res
            .status(400)
            .json({ error: 'Bad request: The id is required' })
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
                runValidators: true,
            },
        )

        if (!updatedUser) {
            return res.status(404).json({
                error: "This user id doesn't exist. Not possible to do the update",
            })
        }

        return res.status(200).json({
            message: 'User record successfully update',
            result: omit(updatedUser.toJSON(), 'password'),
        })
    } catch (error: any) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const userId: string | undefined = req.params.id

    if (!userId) {
        res.status(400).json({ error: 'Bad request: The id is required' })
    }

    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id)

        // if the user doesn't exist !
        if (!deletedUser) {
            return res.status(404).json({
                error: "This user record ID doesn't exist !",
            })
        }

        return res.status(200).json({
            message: 'User record sucessfully deleted',
            result: 'deleted',
            deleted: omit(deletedUser?.toJSON(), 'password'),
        })
    } catch (error: any) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getLikesByUser = async (req: Request, res: Response) => {
    const userId: string | undefined = req.params.id

    if (!userId) {
        res.status(400).json({ error: 'Bad request: The id is required' })
    }

    try {
        const user: IUser | null = await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'User record not found' })
        }

        res.status(200).json({
            message: 'User record sucessfully found',
            result: user.likes,
        })
    } catch (error: any) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const updateMoviesLikesByUser = async (req: Request, res: Response) => {
    const userId: string | undefined = req.params.id
    const { movieLike, productType } = req.body

    if (!userId || !movieLike || !productType) {
        return res
            .status(400)
            .json({ error: 'Bad request: The id is required' })
    }

    try {
        const user: IUser | null = await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({ error: 'User record not found' })
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
            return res.status(404).json({
                error: "This user id doesn't exist. Not possible to do the update",
            })
        }

        return res.status(200).json({
            message: 'User record successfully update',
            result: omit(updatedUser.toJSON(), 'password'),
        })
    } catch (error: any) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updateLikes = (likesArray: number[], productLike: number): number[] => {
    return likesArray.includes(productLike)
        ? likesArray.filter((e) => e !== productLike)
        : [...likesArray, productLike]
}
