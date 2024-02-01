"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this is a utiliuty function to handle asynchronous errors in Express Midelware.
const catchAsync = (func) => {
    // It returns the promise of the function passed
    // if there is an error it will be catched and transfer to error middleware
    return (req, res, next) => {
        func(req, res, next).catch((err) => next(err));
    };
};
exports.default = catchAsync;
