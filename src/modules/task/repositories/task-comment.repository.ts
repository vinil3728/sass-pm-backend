import { TaskComment } from "../models/task-comment.model";

export class TaskCommentRepository {

    async create(
        data: Partial<TaskComment>
    ) {
        return TaskComment.create(data);
    }

    async findByTask(
        taskId: string
    ) {

        return TaskComment.findAll({
            where: {
                taskId,
            },
            order: [
                ['createdAt', 'ASC']
            ],
        });
    }
}