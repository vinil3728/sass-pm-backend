import { TaskStatus } from '../enums/task-status.enum';
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

    async findByProjectId(
        projectId: string
    ): Promise<Task[]> {

        return Task.findAll({
            where: {
                projectId,
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }

    async findWithRelations(
        taskId: string
    ): Promise<Task | null> {

        return Task.findByPk(taskId, {
            include: [
                {
                    association: 'project',
                },
                {
                    association: 'sprint',
                },
            ],
        });
    }

    async findKanbanTasks(
        projectId: string
    ): Promise<Task[]> {

        return Task.findAll({
            where: {
                projectId,
            },
            order: [
                ['taskNumber', 'ASC']
            ],
        });
    }

    async findTaskWithProject(
        taskId: string
    ): Promise<Task | null> {

        return Task.findByPk(taskId, {
            include: [
                {
                    association: 'project',
                },
            ],
        });
    }

    async updateStatus(
        taskId: string,
        status: TaskStatus
    ): Promise<void> {

        await Task.update(
            { status },
            {
                where: {
                    id: taskId,
                },
            }
        );
    }

    async assignTask(
        taskId: string,
        userId: string
    ): Promise<void> {

        await Task.update(
            {
                assigneeId: userId,
            },
            {
                where: {
                    id: taskId,
                },
            }
        );
    }

    async unassignTask(
        taskId: string
    ): Promise<void> {

        await Task.update(
            {
                assigneeId: null,
            },
            {
                where: {
                    id: taskId,
                },
            }
        );
    }

    async findByAssignee(
        userId: string
    ): Promise<Task[]> {

        return Task.findAll({
            where: {
                assigneeId: userId,
            },
            order: [
                ['updatedAt', 'DESC']
            ],
        });
    }

    async getProjectTasks(
        projectId: string
    ): Promise<Task[]> {

        return Task.findAll({
            where: {
                projectId,
            },
        });
    }
}