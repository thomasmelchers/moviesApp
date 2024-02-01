"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MoviesAppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // 400 - 499: fail
        // 500: error
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        // All errors created with this class are operational errors => error that can occurs in the future
        this.isOperational = true;
        // Capture the stacktrace to see where the error occurs
        // Params: current object + customeError catch stacktrace with this.constructor
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = MoviesAppError;