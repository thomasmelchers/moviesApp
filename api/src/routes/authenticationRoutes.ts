import { Router } from 'express'
import authentication from '../controllers/authController'

const router = Router()

router.post('/', authentication)

export default router
