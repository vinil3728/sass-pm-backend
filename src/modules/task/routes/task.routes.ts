import { Router }
    from 'express';

import { TaskController }
    from '../controllers/task.controller';

import { authMiddleware }
    from '../../../shared/middleware/auth.middleware';

import { projectAccess }
    from '../../project/middleware/project-access.middleware';

import { requireRole }
    from '../../organization/middlewares/require-role.middleware';

import { OrganizationRole }
    from '../../organization/enums/organization-role.enum';

import { validationMiddleware }
    from '../../../shared/middleware/validation.middleware';

import { CreateTaskDto }
    from '../dto/request/create-task.dto';
import { taskAccess } from '../middleware/task-access.middleware';
import { UpdateTaskStatusDto } from '../dto/request/update-task-status.dto';

const router = Router();

const controller =
    new TaskController();

router.post(
    '/projects/:projectId/tasks',

    authMiddleware,

    projectAccess,

    requireRole([
        OrganizationRole.OWNER,
        OrganizationRole.ADMIN,
        OrganizationRole.MEMBER
    ]),

    validationMiddleware(
        CreateTaskDto
    ),

    controller.createTask
);

router.get(
  '/projects/:projectId/tasks',

  authMiddleware,

  projectAccess,

  controller.getTasks
);

router.get(
  '/tasks/:taskId',

  authMiddleware,

  taskAccess,

  controller.getTask
);

router.get(
  '/projects/:projectId/kanban',

  authMiddleware,

  projectAccess,

  controller.getKanbanBoard
);

router.patch(
  '/tasks/:taskId/status',

  authMiddleware,

  taskAccess,

  validationMiddleware(
    UpdateTaskStatusDto
  ),

  controller.updateStatus
);

export default router;