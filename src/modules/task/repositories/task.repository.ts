import { Task } from '../models/task.model';

export class TaskRepository {

    async create(
        data: Partial<Task>
    ): Promise<Task> {
        return Task.create(data);
    }

    async findById(
        id: string
    ): Promise<Task | null> {
        return Task.findByPk(id);
    }

    async getLastTask(
        projectId: string
    ): Promise<Task | null> {

        return Task.findOne({
            where: {
                projectId,
            },
            order: [
                ['taskNumber', 'DESC']
            ],
        });
    }
}