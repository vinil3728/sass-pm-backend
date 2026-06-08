import {
    Request,
    Response,
    NextFunction
} from 'express';

import { ProjectRepository }
    from '../repositories/project.repository';

import { OrganizationMemberRepository }
    from '../../organization/repositories/organization-member.repository';

const projectRepository =
    new ProjectRepository();

const organizationMemberRepository =
    new OrganizationMemberRepository();

export const projectAccess =
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const userId =
            (req as any).user.userId;

        const projectId =
            req.params.projectId;

        const project =
            await projectRepository
                .findProjectWithOrganization(
                    projectId as string
                );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        const membership =
            await organizationMemberRepository
                .findByOrganizationAndUser(
                    project.organizationId,
                    userId
                );

        if (!membership) {
            return res.status(403).json({
                success: false,
                message:
                    'Access denied to project',
            });
        }

        (req as any).project =
            project;

        (req as any).membership =
            membership;

        next();
    };