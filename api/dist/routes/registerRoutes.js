"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = __importDefault(require("../controllers/registerController"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/register:
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
router.post('/', registerController_1.default);
exports.default = router;
