"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMoviesLikesByUser = exports.getLikesByUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUser = void 0;
const userModel_1 = require("../models/userModel");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const lodash_1 = require("lodash");
const moviesAppError_1 = __importDefault(require("../utils/moviesAppError"));
exports.getAllUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userModel_1.UserModel.find();
    // Converting Mongoose doc to JS object and then omit the password field
    const users = data.map((user) => (0, lodash_1.omit)(user.toObject(), 'password'));
    res.status(200).json({
        status: 'success',
        message: 'Users records successfully found',
        result: users,
        length: users.length,
    });
}));
exports.getUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId) {
        return next(new moviesAppError_1.default('Bad request: The id is required', 400));
    }
    const user = yield userModel_1.UserModel.findById(userId);
    if (!user) {
        return next(new moviesAppError_1.default('User record not found', 404));
    }
    return res.status(200).json({
        status: 'success',
        message: 'User record sucessfully found',
        result: (0, lodash_1.omit)(user === null || user === void 0 ? void 0 : user.toJSON(), 'password'),
    });
}));
exports.updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId) {
        return next(new moviesAppError_1.default('Bad request: The id is required', 400));
    }
    const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedUser) {
        return next(new moviesAppError_1.default("This user id doesn't exist. Not possible to do the update", 404));
    }
    return res.status(200).json({
        status: 'success',
        message: 'User record successfully update',
        result: (0, lodash_1.omit)(updatedUser.toJSON(), 'password'),
    });
}));
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId) {
        return next(new moviesAppError_1.default('Bad request: The id is required', 400));
    }
    const deletedUser = yield userModel_1.UserModel.findByIdAndDelete(req.params.id);
    // if the user doesn't exist !
    if (!deletedUser) {
        return next(new moviesAppError_1.default("This user record ID doesn't exist !", 404));
    }
    return res.status(200).json({
        status: 'success',
        message: 'User record sucessfully deleted',
        result: 'deleted',
        deleted: (0, lodash_1.omit)(deletedUser === null || deletedUser === void 0 ? void 0 : deletedUser.toJSON(), 'password'),
    });
});
exports.deleteUser = deleteUser;
exports.getLikesByUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId) {
        return next(new moviesAppError_1.default('Bad request: The id is required', 400));
    }
    const user = yield userModel_1.UserModel.findById(userId);
    if (!user) {
        return next(new moviesAppError_1.default('User record not found', 404));
    }
    res.status(200).json({
        status: 'success',
        message: 'User record sucessfully found',
        result: user.likes,
    });
}));
exports.updateMoviesLikesByUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { movieLike, productType } = req.body;
    if (!userId || !movieLike || !productType) {
        return next(new moviesAppError_1.default('Bad request: The user id, the movie id and product type are required', 400));
    }
    const user = yield userModel_1.UserModel.findById(userId);
    if (!user) {
        return next(new moviesAppError_1.default('User record not found', 404));
    }
    let updatedLikes = updateLikes(productType === 'movie' ? user.likes.movies : user.likes.series, movieLike);
    const updateField = productType === 'movie' ? 'likes.movies' : 'likes.series';
    const updatedUser = yield userModel_1.UserModel.findByIdAndUpdate(userId, { $set: { [updateField]: updatedLikes } }, {
        new: true,
        runValidators: true,
    });
    if (!updatedUser) {
        return next(new moviesAppError_1.default("This user id doesn't exist. Not possible to do the update", 404));
    }
    return res.status(200).json({
        status: 'success',
        message: 'User record successfully update',
        result: (0, lodash_1.omit)(updatedUser.toJSON(), 'password'),
    });
}));
const updateLikes = (likesArray, productLike) => {
    return likesArray.includes(productLike)
        ? likesArray.filter((e) => e !== productLike)
        : [...likesArray, productLike];
};
