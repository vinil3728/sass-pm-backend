import { Router } from 'express';

import { ProjectController }
    from '../controllers/project.controller';

import { authMiddleware }
    from '../../../shared/middleware/auth.middleware';

import { organizationAccess }
    from '../../organization/middlewares/organization-access.middleware';

import { requireRole }
    from '../../organization/middlewares/require-role.middleware';

import { OrganizationRole }
    from '../../organization/enums/organization-role.enum';

import { validationMiddleware }
    from '../../../shared/middleware/validation.middleware';

import { CreateProjectDto }
    from '../dto/request/create-project.dto';
import { projectAccess } from '../middleware/project-access.middleware';

const router = Router();

const controller =
    new ProjectController();

router.post(
    '/organizations/:organizationId/projects',

    authMiddleware,

    organizationAccess,

    requireRole([
        OrganizationRole.OWNER,
        OrganizationRole.ADMIN,
        OrganizationRole.MEMBER,
    ]),

    validationMiddleware(
        CreateProjectDto
    ),

    controller.createProject
);

router.get(
    '/organizations/:organizationId/projects',

    authMiddleware,

    organizationAccess,

    controller.getProjects
);

router.get(
    '/projects/:projectId',

    authMiddleware,

    projectAccess,

    controller.getProject
);


export default router;