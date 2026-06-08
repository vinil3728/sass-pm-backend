import { Router } from 'express';

import { SprintController }
    from '../controllers/sprint.controller';

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

import { CreateSprintDto }
    from '../dto/request/create-sprint.dto';
import { sprintAccess } from '../middleware/sprint-access.middleware';

const router = Router();

const controller =
    new SprintController();

router.post(
    '/projects/:projectId/sprints',

    authMiddleware,

    projectAccess,

    requireRole([
        OrganizationRole.OWNER,
        OrganizationRole.ADMIN,
        OrganizationRole.MEMBER,
    ]),

    validationMiddleware(
        CreateSprintDto
    ),

    controller.createSprint
);

router.patch(
    '/sprints/:sprintId/start',

    authMiddleware,

    sprintAccess,
    
    requireRole([
        OrganizationRole.OWNER,
        OrganizationRole.ADMIN,
    ]),

    controller.startSprint
);


router.patch(
  '/sprints/:sprintId/complete',

  authMiddleware,

  sprintAccess,

  requireRole([
    OrganizationRole.OWNER,
    OrganizationRole.ADMIN,
  ]),

  controller.completeSprint
);

router.patch(
  '/sprints/:sprintId/cancel',

  authMiddleware,

  sprintAccess,

  requireRole([
    OrganizationRole.OWNER,
    OrganizationRole.ADMIN,
  ]),

  controller.cancelSprint
);


export default router;