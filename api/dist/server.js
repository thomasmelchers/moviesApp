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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const swagger_1 = require("./swagger");
const registerRoutes_1 = __importDefault(require("./routes/registerRoutes"));
const authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
const logoutRoutes_1 = __importDefault(require("./routes/logoutRoutes"));
const refrershToken_1 = __importDefault(require("./routes/refrershToken"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const verifyJWT_1 = __importDefault(require("./middlewares/verifyJWT"));
const moviesAppError_1 = __importDefault(require("./utils/moviesAppError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    /*         preflightContinue: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'] */
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Setup Swagger documentation
(0, swagger_1.swaggerSetup)(app);
// Define your routes
app.use('/api/v1/register', registerRoutes_1.default);
app.use('/api/v1/authentication', authenticationRoutes_1.default);
app.use('/api/v1/logout', logoutRoutes_1.default);
app.use('/api/v1/refreshToken', refrershToken_1.default);
app.use(verifyJWT_1.default);
app.use('/api/v1/users', usersRoutes_1.default);
app.use('*', (req, res, next) => {
    next(new moviesAppError_1.default(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorController_1.default);
console.log(process.env.NODE_ENV);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.databaseConnection)();
    console.log(`Server is running on http://localhost:${PORT}`);
}));
