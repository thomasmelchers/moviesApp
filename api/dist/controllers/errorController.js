"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moviesAppError_1 = __importDefault(require("../utils/moviesAppError"));
const developmentError = (res, error) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        //stackTrace: error.stack,
        error: error,
    });
};
const castErrorHandler = (error) => {
    const message = `Invalid value for ${error.path}: ${error.path}`;
    return new moviesAppError_1.default(message, 400);
};
const duplicateKeyErrorHandler = (error) => {
    const message = `The ${Object.keys(error.keyValue)}'s field is already taken with the ${Object.values(error.keyValue)}'s value. Please use something else!`;
    return new moviesAppError_1.default(message, 400);
};
const validationErrorHandler = (error) => {
    const errors = Object.values(error.errors).map((val) => val.message);
    const errorMessages = errors.join('. ');
    const message = `Invalid input data: ${errorMessages}`;
    return new moviesAppError_1.default(message, 400);
};
const productiontError = (res, error) => {
    // Send only operational errors
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
    else {
        // other errors
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong! Please try again later. ',
        });
    }
};
const errorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        developmentError(res, error);
    }
    else if (process.env.NODE_ENV === 'production') {
        if (error.name === 'CastError') {
            error = castErrorHandler(error);
        }
        if (error.code === 11000)
            error = duplicateKeyErrorHandler(error);
        if (error.name === 'ValidationError')
            error = validationErrorHandler(error);
        productiontError(res, error);
    }
};
exports.default = errorHandler;
