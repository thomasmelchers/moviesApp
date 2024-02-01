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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const moviesAppError_1 = __importDefault(require("../utils/moviesAppError"));
const authentication = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || null;
    const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY || null;
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new moviesAppError_1.default('Username and password are required.', 400));
    }
    const foundUser = yield userModel_1.UserModel.findOne({
        username,
    }).exec();
    if (!foundUser) {
        return next(new moviesAppError_1.default('Invalid credentials', 401));
    }
    let passwordMatch = yield bcrypt_1.default.compare(password, foundUser.password);
    if (!foundUser || !passwordMatch) {
        return next(new moviesAppError_1.default('Credentials are not valid!', 401)); // No content
    }
    if (passwordMatch) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const id = foundUser._id;
        if (!ACCESS_TOKEN_KEY || !REFRESH_TOKEN_KEY) {
            return next(new moviesAppError_1.default('Token issues', 419));
        }
        const accessToken = jsonwebtoken_1.default.sign({
            UserInfo: {
                id,
                username,
                roles: roles,
            },
        }, ACCESS_TOKEN_KEY, {
            expiresIn: '1h',
        });
        const refreshToken = jsonwebtoken_1.default.sign({ username }, REFRESH_TOKEN_KEY, {
            expiresIn: '1d',
        });
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = yield foundUser.save();
        // console.log(result)
        // console.log(roles)
        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });
        // Send authorization roles and access token to user
        res.json({ id, username, accessToken });
    }
}));
exports.default = authentication;
