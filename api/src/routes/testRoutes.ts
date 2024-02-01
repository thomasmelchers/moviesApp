import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    console.log('test')
    console.log('client:', process.env.CLIENT_URL, 'port:', process.env.PORT)
    res.status(201).json({ testRoute: 'test' })
})

export default router
