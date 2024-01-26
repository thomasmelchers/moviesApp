import { Schema, Document, model } from 'mongoose'
import validator from 'validator'

export interface IUser extends Document {
    roles: {
        User: number
        Editor?: number
        Admin?: number
    }
    username: string
    password: string
    email: string
    firstname: string
    lastname: string
    gender: string
    refreshToken: string
    likes: {
        movies: number[]
        series: number[]
    }
    correctPassword: (candidatePassword: string) => Promise<boolean>
}

const userSchema = new Schema(
    {
        roles: {
            User: {
                type: Number,
                default: 1000,
            },
            Editor: {
                type: Number,
                validate: {
                    validator: function (value: number) {
                        return value === 2000
                    },
                    message: 'Editor role should be set to 3000',
                },
            },
            Admin: {
                type: Number,
                validate: {
                    validator: function (value: number) {
                        return value === 3000
                    },
                    message: 'Admin role should be set to 3000',
                },
            },
        },

        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate: validator.isEmail,
        },

        password: {
            type: String,
            trim: true,
        },

        firstname: {
            type: String,
            trim: true,
        },

        lastname: {
            type: String,
            trim: true,
        },

        gender: {
            type: String,
            maxlength: 1,
            enum: {
                values: ['F', 'M', 'X', ''],
            },
        },

        refreshToken: {
            type: String,
        },

        likes: {
            movies: {
                type: [Number],
            },
            series: {
                type: [Number],
            },
        },
    },
    { timestamps: true },
)

export const UserModel = model<IUser>('User', userSchema)
