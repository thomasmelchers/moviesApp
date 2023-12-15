import { Request, Response, NextFunction } from 'express'
import ROLES_LIST from '../config/roles_list'

const verifyIdOrRoles = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRoles = (req as any)?.roles
        const userId = (req as any)?.id

        // Stop if no userRoles
        if (!userRoles) return res.status(401).json({ error: 'Unauthorized' })

        // If role is Admin => get access to the resource
        if (userRoles.includes(ROLES_LIST.Admin)) {
            console.log('Request sent by admin user')
            return next()
        }

        // If role is User
        else if (userRoles.includes(ROLES_LIST.User)) {
            const userHasUserRole = userRoles.includes(ROLES_LIST.User)

            // check if the id is the same coming from the request
            const isAccessingOwnResource =
                userHasUserRole && userId === req.params.id

            if (!isAccessingOwnResource) {
                return res.status(401).json({
                    error: 'Unauthorized: Resource access not allowed.',
                })
            }

            console.log('Request sent by the user')
            return next()
        }

        // If role is not admin or user => no access
        else {
            return res.status(401).send('Unauthorized: Admin role required.')
        }
    }
}

export default verifyIdOrRoles
