import { Response } from 'express';

import { SprintService }
    from '../services/sprint.service';

import { AuthenticatedRequest }
    from '../../../shared/types/authenticated-request';

export class SprintController {

    private readonly sprintService =
        new SprintService();

    createSprint = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.sprintService.createSprint(
                req.params.projectId as string,
                req.user!.userId,
                req.body
            );

        return res.status(201).json({
            success: true,
            message:
                'Sprint created successfully',
            data: result,
        });
    };

    startSprint = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.sprintService.startSprint(
                req.params.sprintId as string
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    completeSprint = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.sprintService.completeSprint(
                req.params.sprintId as string
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    cancelSprint = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.sprintService.cancelSprint(
                req.params.sprintId as string
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };
}