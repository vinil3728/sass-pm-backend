import { NotificationType } from "../../notification/enums/notification-type.enum";
import { NotificationService } from "../../notification/services/notification.service";
import { TaskCommentRepository } from "../repositories/task-comment.repository";
import { TaskRepository } from "../repositories/task.repository";
import { TaskActivityService } from "./task-activity.service";

export class TaskCommentService {

    private readonly repository =
        new TaskCommentRepository();

    private readonly activityService =
        new TaskActivityService();

    private readonly taskRepository =
        new TaskRepository();

    private readonly notificationService =
        new NotificationService();

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

        const task =
            await this.taskRepository.findById(
                taskId
            );

        if (
            task?.assigneeId &&
            task.assigneeId !== userId
        ) {

            await this.notificationService
                .createNotification(

                    task.assigneeId,

                    NotificationType.TASK_COMMENT,

                    'New Comment',

                    'A comment was added to your task',

                    {
                        taskId,
                    }
                );
        }

        return result;
    }
}