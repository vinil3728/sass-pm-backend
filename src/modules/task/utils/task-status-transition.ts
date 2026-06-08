import { TaskStatus }
    from '../enums/task-status.enum';

export class TaskStatusTransition {

    static canMove(
        current: TaskStatus,
        target: TaskStatus
    ): boolean {

        const transitions: Record<TaskStatus, TaskStatus[]> = {

            BACKLOG: [
                TaskStatus.TODO
            ],

            TODO: [
                TaskStatus.BACKLOG,
                TaskStatus.IN_PROGRESS
            ],

            IN_PROGRESS: [
                TaskStatus.TODO,
                TaskStatus.IN_REVIEW
            ],

            IN_REVIEW: [
                TaskStatus.IN_PROGRESS,
                TaskStatus.DONE
            ],

            DONE: [],
        };

        return transitions[current]
            ?.includes(target) ?? false;
    }
}