import {
    Response,
    NextFunction
} from 'express';

import { SprintRepository }
    from '../repositories/sprint.repository';

import { OrganizationMemberRepository }
    from '../../organization/repositories/organization-member.repository';

import { AuthenticatedRequest }
    from '../../../shared/types/authenticated-request';

const sprintRepository =
    new SprintRepository();

const organizationMemberRepository =
    new OrganizationMemberRepository();

export const sprintAccess =
    async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const sprintId =
                req.params['sprintId'];

            const userId =
                req.user?.userId;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized',
                });
            }

            const sprint =
                await sprintRepository.findWithProject(
                    sprintId as string
                );

            if (!sprint) {
                return res.status(404).json({
                    success: false,
                    message: 'Sprint not found',
                });
            }

            const membership =
                await organizationMemberRepository
                    .findByOrganizationAndUser(
                        sprint.project.organizationId,
                        userId
                    );

            if (!membership) {
                return res.status(403).json({
                    success: false,
                    message:
                        'Access denied to sprint',
                });
            }

            req.sprint = sprint;

            req.project = sprint.project;

            req.membership = membership;

            next();

        } catch (error) {

            return res.status(500).json({
                success: false,
                message:
                    'Failed to validate sprint access',
            });

        }
    };