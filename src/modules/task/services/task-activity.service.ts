import { TaskActivityRepository } from "../repositories/task-activity.repository";

export class TaskActivityService {

    private readonly repository =
        new TaskActivityRepository();

    async log(
        taskId: string,
        userId: string,
        action: string,
        metadata?: object
    ) {

        await this.repository.create({
            taskId,
            userId,
            action,
            metadata,
        });
    }
}