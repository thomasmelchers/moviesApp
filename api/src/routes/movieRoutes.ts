import express from 'express'
import { Request, Response } from 'express'

const router = express.Router()

// Define your routes here
/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Get all movies
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello from movie route!' })
})

export { router as movieRoutes }
