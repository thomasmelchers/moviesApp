import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { swaggerSetup } from "./swagger"
import { movieRoutes } from "./routes/movieRoutes"
import registerRoutes from "./routes/registerRoutes"
import authenticationRoutes from "./routes/authenticationRoutes"
import { databaseConnection } from "./config/database"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Define your routes
app.use("/api/movies", movieRoutes)
app.use("/api/register", registerRoutes)
app.use("/api/authentication", authenticationRoutes)

// Setup Swagger documentation
swaggerSetup(app)

console.log(process.env.NODE_ENV)

app.listen(PORT, async () => {
  await databaseConnection()
  console.log(`Server is running on http://localhost:${PORT}`)
})
