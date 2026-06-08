import { Response }
    from 'express';

import { TaskService }
    from '../services/task.service';

import { AuthenticatedRequest }
    from '../../../shared/types/authenticated-request';

export class TaskController {

    private readonly taskService =
        new TaskService();

    createTask = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.taskService.createTask(
                req.params.projectId as string,
                req.user!.userId,
                req.body
            );

        return res.status(201).json({
            success: true,
            data: result,
        });
    };

    getTasks = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.taskService.getTasks(
                req.params.projectId as string
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    getTask = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.taskService.getTask(
                req.params.taskId as string
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    getKanbanBoard = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.taskService
                .getKanbanBoard(
                    req.params.projectId as string
                );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };
}