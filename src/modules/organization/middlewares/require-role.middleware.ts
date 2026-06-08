import {
    Request,
    Response,
    NextFunction
} from 'express';

import { OrganizationRole }
    from '../enums/organization-role.enum';

export const requireRole =
    (
        roles: OrganizationRole[]
    ) =>
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {

            const membership =
                (req as any).membership;

            if (
                !roles.includes(
                    membership.role
                )
            ) {
                return res.status(403).json({
                    success: false,
                    message:
                        'Insufficient permissions',
                });
            }

            next();
        };