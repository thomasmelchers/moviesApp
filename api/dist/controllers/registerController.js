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
const lodash_1 = require("lodash");
const bcrypt_1 = __importDefault(require("bcrypt"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const moviesAppError_1 = __importDefault(require("../utils/moviesAppError"));
const createNewUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, roles, email } = req.body;
    if (!password) {
        return next(new moviesAppError_1.default('Invalid input data: Password is required field', 400));
    }
    //encrypt the password
    const hashedPwd = yield bcrypt_1.default.hash(password, 10);
    const createdUser = yield userModel_1.UserModel.create({
        username,
        password: hashedPwd,
        roles,
        email,
    });
    res.status(201).json({
        status: 'success',
        result: (0, lodash_1.omit)(createdUser.toJSON(), 'password'),
    });
}));
exports.default = createNewUser;
