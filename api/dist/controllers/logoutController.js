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
const userModel_1 = require("../models/userModel");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const moviesAppError_1 = __importDefault(require("../utils/moviesAppError"));
// Delete refreshToken - need to remove accessToken in Front end
const logout = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        return next(new moviesAppError_1.default('', 204)); // No content
    }
    const refreshToken = cookies.jwt;
    // Is refreshToken in db?
    const foundUser = yield userModel_1.UserModel.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return next(new moviesAppError_1.default('', 204)); // No content
    }
    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = yield foundUser.save();
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.status(204).json({
        message: `${foundUser.username} has been logged out!`,
    });
}));
exports.default = logout;
