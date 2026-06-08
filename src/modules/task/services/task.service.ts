import { NotificationType } from '../../notification/enums/notification-type.enum';
import { NotificationService } from '../../notification/services/notification.service';
import { OrganizationMemberRepository } from '../../organization/repositories/organization-member.repository';
import { ProjectRepository } from '../../project/repositories/project.repository';
import { CreateTaskDto } from '../dto/request/create-task.dto';
import { GetTasksQueryDto } from '../dto/request/get-tasks-query.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskRepository } from '../repositories/task.repository';
import { TaskStatusTransition } from '../utils/task-status-transition';
import { TaskActivityService } from './task-activity.service';

export class TaskService {

    constructor(
        private readonly taskRepository =
            new TaskRepository(),

        private readonly projectRepository =
            new ProjectRepository(),

        private readonly memberRepository =
            new OrganizationMemberRepository(),

        private readonly notificationService =
            new NotificationService(),

        private readonly activityService =
            new TaskActivityService()
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
        projectId: string,
        query: GetTasksQueryDto
    ) {

        const result =
            await this.taskRepository
                .searchTasks(
                    projectId,
                    query
                );

        return {

            items:
                result.rows,

            page:
                query.page,

            limit:
                query.limit,

            totalItems:
                result.count,

            totalPages:
                Math.ceil(
                    result.count /
                    query.limit
                ),
        };
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

    async updateStatus(
        taskId: string,
        targetStatus: TaskStatus,
        currentUserId: string
    ) {

        const task =
            await this.taskRepository
                .findById(taskId);

        if (!task) {
            throw new Error(
                'Task not found'
            );
        }

        const allowed =
            TaskStatusTransition.canMove(
                task.status,
                targetStatus
            );

        if (!allowed) {
            throw new Error(
                `Cannot move task from ${task.status} to ${targetStatus}`
            );
        }

        await this.taskRepository
            .updateStatus(
                taskId,
                targetStatus
            );

        if (
            task.assigneeId &&
            task.assigneeId !== currentUserId
        ) {

            await this.notificationService
                .createNotification(

                    task.assigneeId,

                    NotificationType.TASK_STATUS_CHANGED,

                    'Task Updated',

                    `Task moved to ${targetStatus}`,

                    {
                        taskId,
                    }
                );
        }

        return {
            success: true,
        };
    }

    async assignTask(
        taskId: string,
        userId: string
    ) {

        const task =
            await this.taskRepository
                .findById(taskId);

        if (!task) {
            throw new Error(
                'Task not found'
            );
        }

        const member =
            await this.memberRepository
                .findByOrganizationAndUser(
                    task.organizationId,
                    userId
                );

        if (!member) {
            throw new Error(
                'User is not a member of this organization'
            );
        }

        await this.taskRepository
            .assignTask(
                taskId,
                userId
            );

        await this.activityService.log(
            taskId,
            userId,
            'TASK_ASSIGNED'
        );

        await this.notificationService
            .createNotification(
                userId,
                NotificationType.TASK_ASSIGNED,
                'Task Assigned',
                `You have been assigned a task`,
                {
                    taskId,
                }
            );

        return {
            success: true,
        };
    }

    async unassignTask(
        taskId: string
    ) {

        const task =
            await this.taskRepository
                .findById(taskId);

        if (!task) {
            throw new Error(
                'Task not found'
            );
        }

        await this.taskRepository
            .unassignTask(
                taskId
            );

        return {
            success: true,
        };
    }

    async getMyTasks(
        userId: string
    ) {

        return this.taskRepository
            .findByAssignee(
                userId
            );
    }

    async getProjectWorkload(
        projectId: string
    ) {

        const tasks =
            await this.taskRepository
                .getProjectTasks(
                    projectId
                );

        const workload =
            tasks.reduce(
                (
                    acc,
                    task
                ) => {

                    if (
                        !task.assigneeId
                    ) {
                        return acc;
                    }

                    if (
                        !acc[
                        task.assigneeId
                        ]
                    ) {
                        acc[
                            task.assigneeId
                        ] = 0;
                    }

                    acc[
                        task.assigneeId
                    ]++;

                    return acc;

                },
                {} as Record<
                    string,
                    number
                >
            );

        return workload;
    }
}