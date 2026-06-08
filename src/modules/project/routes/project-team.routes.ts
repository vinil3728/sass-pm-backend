import { Router }
    from 'express';

import { ProjectTeamController }
    from '../controllers/project-team.controller';

import { authMiddleware }
    from '../../../shared/middleware/auth.middleware';

const router = Router();

const controller =
    new ProjectTeamController();

router.post(
    '/projects/:projectId/teams',
    authMiddleware,
    controller.assignTeam
);

router.get(
    '/projects/:projectId/teams',
    authMiddleware,
    controller.getProjectTeams
);

router.delete(
    '/projects/:projectId/teams/:teamId',
    authMiddleware,
    controller.removeTeam
);

export default router;