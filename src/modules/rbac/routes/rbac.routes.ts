import { Router }
    from 'express';

import { RbacController }
    from '../controllers/rbac.controller';

import { authMiddleware }
    from '../../../shared/middleware/auth.middleware';

const router = Router();

const controller =
    new RbacController();

router.post(
    '/rbac/roles',
    authMiddleware,
    controller.createRole
);

router.get(
    '/rbac/roles',
    authMiddleware,
    controller.getRoles
);

router.get(
    '/rbac/permissions',
    authMiddleware,
    controller.getPermissions
);

router.post(
    '/rbac/roles/:roleId/permissions',
    authMiddleware,
    controller.assignPermissionToRole
);

router.post(
    '/rbac/members/:organizationMemberId/roles',
    authMiddleware,
    controller.assignRoleToMember
);

router.get(
    '/rbac/members/:organizationMemberId/roles',
    authMiddleware,
    controller.getMemberRoles
);

export default router;