"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Interface which extends Request type
const verifyJWT = (req, res, next) => {
    const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
    if (!ACCESS_TOKEN_KEY) {
        return res.status(500).json({
            status: 'error',
            message: 'access token key not reachable',
        });
    }
    const authHeader = req.headers.authorization || req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer'))) {
        return res
            .status(401)
            .json({ status: 'fail', message: 'Unauthorized access' });
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ status: 'fail', message: 'Invalid token' });
        }
        if (!decoded) {
            return res
                .status(403)
                .json({ status: 'fail', message: 'Invalid token' });
        }
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;
        req.id = decoded.UserInfo.id;
        next();
    });
};
exports.default = verifyJWT;
