"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    roles: {
        User: {
            type: Number,
            default: 1000,
        },
        Editor: {
            type: Number,
            validate: {
                validator: function (value) {
                    return value === 2000;
                },
                message: 'Editor role should be set to 3000',
            },
        },
        Admin: {
            type: Number,
            validate: {
                validator: function (value) {
                    return value === 3000;
                },
                message: 'Admin role should be set to 3000',
            },
        },
    },
    username: {
        type: String,
        required: [true, 'Username is required field'],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required field'],
        trim: true,
        lowercase: true,
        validate: validator_1.default.isEmail,
    },
    password: {
        type: String,
        required: true,
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
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
