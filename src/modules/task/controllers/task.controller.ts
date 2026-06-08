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
            await this.taskService
                .getTasks(
                    req.params.projectId as string,
                    req.query as any
                );

        return res.status(200)
            .json({
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

    updateStatus = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.taskService
                .updateStatus(
                    req.params.taskId as string,
                    req.body.status,
                    req.body.userId
                );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    assignTask = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.taskService
                .assignTask(
                    req.params.taskId as string,
                    req.body.userId
                );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    unassignTask = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.taskService
                .unassignTask(
                    req.params.taskId as string
                );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    getMyTasks = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.taskService
                .getMyTasks(
                    req.user!.userId
                );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    getWorkload = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.taskService
                .getProjectWorkload(
                    req.params.projectId as string
                );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };
}