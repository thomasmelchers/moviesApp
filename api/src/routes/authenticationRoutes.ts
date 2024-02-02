import { NextFunction, Request, Response, Router } from 'express'
import authentication from '../controllers/authController'

const router = Router()

router.post('/', authentication)

// export const authenticationHandlerRoutes = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ): Promise<void> => {
//     await router(req, res, next)
// }
export default router
