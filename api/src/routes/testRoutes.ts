import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    console.log('test')
    res.status(201).json({ testRoute: 'test' })
})

export default router
