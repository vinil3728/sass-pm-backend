import { Response } from 'express';

import { AuthRequest }
    from '../../../shared/middleware/auth.middleware';

import { ProjectService }
    from '../services/project.service';

export class ProjectController {

    private readonly projectService =
        new ProjectService();

    createProject = async (
        req: AuthRequest,
        res: Response
    ) => {

        const result =
            await this.projectService.createProject(
                req.params.organizationId as string,
                req.user!.userId,
                req.body
            );

        return res.status(201).json({
            success: true,
            message:
                'Project created successfully',
            data: result,
        });
    };

    getProjects = async (
        req: AuthRequest,
        res: Response
    ) => {

        const result =
            await this.projectService.getProjects(
                req.params.organizationId as string
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    getProject = async (
        req: AuthRequest,
        res: Response
    ) => {

        const result =
            await this.projectService.getProject(
                req.params.projectId as string
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };
}
