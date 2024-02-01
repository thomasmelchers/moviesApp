import { Request, Response, NextFunction } from 'express'
import ROLES_LIST from '../config/roles_list'

const verifyRoles = (...allowedRoles: ROLES_LIST[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!(req as any)?.roles)
            return res
                .status(401)
                .json({ status: 'fail', message: 'Unauthorized access' })
        const rolesArray = [...allowedRoles]
        const result = (req as any).roles
            .map((role: number) => rolesArray.includes(role))
            .find((val: boolean) => val === true)
        if (!result)
            return res
                .status(401)
                .json({ status: 'fail', message: 'Unauthorized access' })
        next()
    }
}

export default verifyRoles
