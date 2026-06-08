import {
    Request,
    Response,
    NextFunction
} from 'express';

import { OrganizationMemberRepository }
    from '../repositories/organization-member.repository';

const repository =
    new OrganizationMemberRepository();

export const organizationAccess =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const userId =
            (req as any).user.userId;

        const organizationId =
            req.params['organizationId'] as string;

        const membership =
            await repository.findByOrganizationAndUser(
                organizationId,
                userId
            );

        if (!membership) {
            return res.status(403).json({
                success: false,
                message:
                    'Access denied to organization',
            });
        }

        (req as any).membership =
            membership;

        next();
    };