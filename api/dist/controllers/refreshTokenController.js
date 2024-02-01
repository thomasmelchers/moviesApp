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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const moviesAppError_1 = __importDefault(require("../utils/moviesAppError"));
const handleRefreshToken = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY || null;
    const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY || null;
    if (!ACCESS_TOKEN_KEY || !REFRESH_TOKEN_KEY) {
        return next(new moviesAppError_1.default('Token issues', 419));
    }
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        return next(new moviesAppError_1.default('Unauthorized access', 401));
        return res.status(401);
    }
    const refreshToken = cookies.jwt;
    const foundUser = yield userModel_1.UserModel.findOne({ refreshToken });
    if (!foundUser) {
        return next(new moviesAppError_1.default('Forbidden access', 403));
    }
    // evaluate jwt
    jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_KEY, (err, decoded) => {
        if (err || foundUser.username !== (decoded === null || decoded === void 0 ? void 0 : decoded.username))
            return res.sendStatus(403);
        const roles = Object.values(foundUser.roles);
        const id = foundUser._id;
        const accessToken = jsonwebtoken_1.default.sign({
            UserInfo: {
                id,
                username: decoded.username,
                roles: roles,
            },
        }, ACCESS_TOKEN_KEY, { expiresIn: '1h' });
        res.json({ accessToken });
    });
}));
exports.default = handleRefreshToken;
