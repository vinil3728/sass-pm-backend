import { TaskCommentRepository } from "../repositories/task-comment.repository";
import { TaskActivityService } from "./task-activity.service";

export class TaskCommentService {

    private readonly repository =
        new TaskCommentRepository();

    private readonly activityService =
        new TaskActivityService();

    async createComment(
        taskId: string,
        userId: string,
        comment: string
    ) {

        const result =
            await this.repository.create({
                taskId,
                userId,
                comment,
            });

        await this.activityService.log(
            taskId,
            userId,
            'COMMENT_ADDED'
        );

        return result;
    }
}