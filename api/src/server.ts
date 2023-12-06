import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { databaseConnection } from "./config/database";
import { swaggerSetup } from "./swagger";

import { movieRoutes } from "./routes/movieRoutes";
import registerRoutes from "./routes/registerRoutes";
import authenticationRoutes from "./routes/authenticationRoutes";
import logoutRoutes from "./routes/logoutRoutes";
import refreshTokenRoutes from "./routes/refrershToken";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    /*         preflightContinue: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Range', 'X-Content-Range'] */
  }),
);
app.use(express.json());
app.use(cookieParser());

// Define your routes
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/register", registerRoutes);
app.use("/api/v1/authentication", authenticationRoutes);
app.use("/api/v1/logout", logoutRoutes);
app.use("/api/v1/refreshToken", refreshTokenRoutes);

// Setup Swagger documentation
swaggerSetup(app);

console.log(process.env.NODE_ENV);

app.listen(PORT, async () => {
  await databaseConnection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
