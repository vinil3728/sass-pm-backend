import {
    Response,
    NextFunction
} from 'express';

import { TaskRepository }
    from '../repositories/task.repository';

import { OrganizationMemberRepository }
    from '../../organization/repositories/organization-member.repository';

import { AuthenticatedRequest }
    from '../../../shared/types/authenticated-request';

const taskRepository =
    new TaskRepository();

const memberRepository =
    new OrganizationMemberRepository();

export const taskAccess =
    async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ) => {

        const task =
            await taskRepository
                .findTaskWithProject(
                    req.params.taskId as string
                );

        if (!task) {
            return res.status(404).json({
                success: false,
                message:
                    'Task not found',
            });
        }

        const membership =
            await memberRepository
                .findByOrganizationAndUser(
                    task.project.organizationId,
                    req.user!.userId
                );

        if (!membership) {
            return res.status(403).json({
                success: false,
                message:
                    'Access denied',
            });
        }

        req.task = task as any;
        req.project = task.project;
        req.membership =
            membership;

        next();
    };