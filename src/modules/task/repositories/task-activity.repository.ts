import { TaskActivity } from "../models/task-activity.model";

export class TaskActivityRepository {

    async create(
        data: Partial<TaskActivity>
    ) {

        return TaskActivity.create(data);
    }

    async findByTask(
        taskId: string
    ) {

        return TaskActivity.findAll({
            where: {
                taskId,
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }
}