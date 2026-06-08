import fs from 'fs/promises';

import { TaskAttachmentRepository }
    from '../repositories/task-attachment.repository';

import { TaskActivityService }
    from './task-activity.service';

export class TaskAttachmentService {

    private readonly repository =
        new TaskAttachmentRepository();

    private readonly activityService =
        new TaskActivityService();

    async uploadFile(
        taskId: string,
        userId: string,
        file: Express.Multer.File
    ) {

        const attachment =
            await this.repository.create({

                taskId,

                uploadedBy:
                    userId,

                originalName:
                    file.originalname,

                storedName:
                    file.filename,

                filePath:
                    file.path,

                mimeType:
                    file.mimetype,

                fileSize:
                    file.size,
            });

        await this.activityService.log(
            taskId,
            userId,
            'FILE_UPLOADED',
            {
                fileName:
                    file.originalname,
            }
        );

        return attachment;
    }

    async getAttachments(
        taskId: string
    ) {

        return this.repository.findByTask(
            taskId
        );
    }

    async deleteAttachment(
        attachmentId: string,
        userId: string
    ) {

        const attachment =
            await this.repository.findById(
                attachmentId
            );

        if (!attachment) {
            throw new Error(
                'Attachment not found'
            );
        }

        try {

            await fs.unlink(
                attachment.filePath
            );

        } catch {
            // Ignore if file already removed
        }

        await this.repository.delete(
            attachmentId
        );

        await this.activityService.log(
            attachment.taskId,
            userId,
            'FILE_DELETED',
            {
                fileName:
                    attachment.originalName,
            }
        );

        return {
            success: true,
        };
    }
}