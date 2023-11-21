/**
 * @swagger
 * components:
 *   schemas:
 *      Register:
 *          type: object
 *          required:
 *              - username
 *              - email
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              roles:
 *                  type: object
 *
 */

import { Router } from "express"
import createNewUser from "../controllers/registerController"

const router = Router()

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Endpoint to create a new user
 *     tags: [Register]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *              $ref: '#components/schemas/Register'
 *     responses:
 *       201:
 *         description: user created successfully
 *       409:
 *         description: username or email is duplicated
 *       422:
 *         description: Username, password and email are required
 *       500:
 *         description: User is not created
 */
router.post("/", createNewUser)

export default router
