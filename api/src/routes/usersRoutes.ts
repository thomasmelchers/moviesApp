import { Router } from 'express'
import {
    deleteUser,
    getAllUser,
    getUser,
    updateUser,
    getLikesByUser,
    updateMoviesLikesByUser,
} from '../controllers/usersController'
import verifyRoles from '../middlewares/verifyRoles'
import ROLES_LIST from '../config/roles_list'
import verifyIdOrRoles from '../middlewares/verifyIdOrRole'

const router = Router()

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
router.get('/', verifyRoles(ROLES_LIST.Admin), getAllUser)

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
router.get('/:id', verifyIdOrRoles(), getUser)
router.get('/:id/likes', verifyIdOrRoles(), getLikesByUser)

router.patch('/:id', verifyIdOrRoles(), updateUser)
router.patch('/:id/likes', verifyIdOrRoles(), updateMoviesLikesByUser)
router.delete('/:id', verifyRoles(ROLES_LIST.Admin), deleteUser)

export default router
