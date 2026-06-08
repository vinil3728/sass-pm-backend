import { ProjectRepository } from '../../project/repositories/project.repository';
import { CreateTaskDto } from '../dto/request/create-task.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskRepository }
    from '../repositories/task.repository';

export class TaskService {

    constructor(
        private readonly taskRepository =
            new TaskRepository(),

        private readonly projectRepository =
            new ProjectRepository()
    ) { }

    async createTask(
        projectId: string,
        reporterId: string,
        data: CreateTaskDto
    ) {

        const project =
            await this.projectRepository
                .findById(projectId);

        if (!project) {
            throw new Error(
                'Project not found'
            );
        }

        const taskNumber =
            project.nextTaskNumber;

        const taskKey =
            `${project.key}-${taskNumber}`;

        const task =
            await this.taskRepository.create({
                organizationId:
                    project.organizationId,

                projectId,

                sprintId:
                    data.sprintId || null,

                taskNumber,

                taskKey,

                title: data.title,

                description:
                    data.description,

                reporterId,

                assigneeId:
                    data.assigneeId || null,

                priority:
                    data.priority,

                type:
                    data.type,

                storyPoints:
                    data.storyPoints || 0,
            });

        await this.projectRepository
            .incrementTaskNumber(
                project
            );

        return task;
    }

    async getTasks(
        projectId: string
    ) {

        return this.taskRepository
            .findByProjectId(
                projectId
            );
    }

    async getTask(
        taskId: string
    ) {

        const task =
            await this.taskRepository
                .findWithRelations(
                    taskId
                );

        if (!task) {
            throw new Error(
                'Task not found'
            );
        }

        return task;
    }

    async getKanbanBoard(
        projectId: string
    ) {

        const tasks =
            await this.taskRepository
                .findKanbanTasks(
                    projectId
                );

        return {
            backlog: tasks.filter(
                t =>
                    t.status ===
                    TaskStatus.BACKLOG
            ),

            todo: tasks.filter(
                t =>
                    t.status ===
                    TaskStatus.TODO
            ),

            inProgress: tasks.filter(
                t =>
                    t.status ===
                    TaskStatus.IN_PROGRESS
            ),

            inReview: tasks.filter(
                t =>
                    t.status ===
                    TaskStatus.IN_REVIEW
            ),

            done: tasks.filter(
                t =>
                    t.status ===
                    TaskStatus.DONE
            ),
        };
    }
}