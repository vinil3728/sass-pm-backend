import { TaskAttachment } from '../models/task-attachment.model';

export class TaskAttachmentRepository {

    async create(
        data: Partial<TaskAttachment>
    ): Promise<TaskAttachment> {

        return TaskAttachment.create(
            data as any
        );
    }

    async findByTask(
        taskId: string
    ): Promise<TaskAttachment[]> {

        return TaskAttachment.findAll({
            where: {
                taskId,
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }

    async findById(
        attachmentId: string
    ): Promise<TaskAttachment | null> {

        return TaskAttachment.findByPk(
            attachmentId
        );
    }

    async delete(
        attachmentId: string
    ): Promise<void> {

        await TaskAttachment.destroy({
            where: {
                id: attachmentId,
            },
        });
    }
}