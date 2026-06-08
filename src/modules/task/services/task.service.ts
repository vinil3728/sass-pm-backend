import { TaskRepository }
    from '../repositories/task.repository';

export class TaskService {

    private readonly taskRepository =
        new TaskRepository();
}