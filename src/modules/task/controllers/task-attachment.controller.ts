import {
    Response
} from 'express';

import {
    AuthenticatedRequest
} from '../../../shared/types/authenticated-request';

import {
    TaskAttachmentService
} from '../services/task-attachment.service';

export class TaskAttachmentController {

    private readonly service =
        new TaskAttachmentService();

    uploadAttachment = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const file = req.file;

        if (!file) {

            return res.status(400)
                .json({
                    success: false,
                    message:
                        'File is required',
                });
        }

        const result =
            await this.service.uploadFile(
                req.params.taskId as string,
                req.user!.userId,
                file
            );

        return res.status(201)
            .json({
                success: true,
                data: result,
            });
    };

    getAttachments = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service.getAttachments(
                req.params.taskId as string
            );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };

    deleteAttachment = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service
                .deleteAttachment(
                    req.params.attachmentId as string,
                    req.user!.userId
                );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };
}