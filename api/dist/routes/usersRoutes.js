"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const verifyRoles_1 = __importDefault(require("../middlewares/verifyRoles"));
const roles_list_1 = __importDefault(require("../config/roles_list"));
const verifyIdOrRole_1 = __importDefault(require("../middlewares/verifyIdOrRole"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Returns a list of all users
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *          description: Internal Server Error
 */
router.get('/', (0, verifyRoles_1.default)(roles_list_1.default.Admin), usersController_1.getAllUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by Id
 *     tags: [Users]
 *     description: Return a user by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request The id is required
 *       404:
 *         description: User record not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', (0, verifyIdOrRole_1.default)(), usersController_1.getUser);
router.get('/:id/likes', (0, verifyIdOrRole_1.default)(), usersController_1.getLikesByUser);
router.patch('/:id', (0, verifyIdOrRole_1.default)(), usersController_1.updateUser);
router.patch('/:id/likes', (0, verifyIdOrRole_1.default)(), usersController_1.updateMoviesLikesByUser);
router.delete('/:id', (0, verifyRoles_1.default)(roles_list_1.default.Admin), usersController_1.deleteUser);
exports.default = router;
