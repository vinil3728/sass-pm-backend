import { Router }
    from 'express';

import { TeamController }
    from '../controllers/team.controller';

import { authMiddleware }
    from '../../../shared/middleware/auth.middleware';

import { organizationAccess }
    from '../../organization/middlewares/organization-access.middleware';

import { requireRole }
    from '../../organization/middlewares/require-role.middleware';

import { OrganizationRole }
    from '../../organization/enums/organization-role.enum';

const router = Router();

const controller =
    new TeamController();

router.post(
    '/organizations/:organizationId/teams',
    authMiddleware,
    organizationAccess,
    requireRole([
        OrganizationRole.OWNER,
        OrganizationRole.ADMIN,
    ]),
    controller.createTeam
);

router.get(
    '/organizations/:organizationId/teams',
    authMiddleware,
    organizationAccess,
    controller.getOrganizationTeams
);

router.get(
    '/teams/:teamId',
    authMiddleware,
    controller.getTeam
);

router.patch(
    '/teams/:teamId',
    authMiddleware,
    controller.updateTeam
);

router.delete(
    '/teams/:teamId',
    authMiddleware,
    controller.deleteTeam
);

router.post(
    '/teams/:teamId/members',
    authMiddleware,
    controller.addMember
);

router.get(
    '/teams/:teamId/members',
    authMiddleware,
    controller.getTeamMembers
);

router.delete(
    '/teams/:teamId/members/:userId',
    authMiddleware,
    controller.removeMember
);

export default router;