import { Router } from 'express';

import { OrganizationController } from '../controllers/organization.controller';

import { authMiddleware } from '../../../shared/middleware/auth.middleware';

import { validationMiddleware } from '../../../shared/middleware/validation.middleware';

import { CreateOrganizationDto } from '../dto/request/create-organization.dto';
import { organizationAccess } from '../middlewares/organization-access.middleware';
import { AcceptInvitationDto } from '../dto/request/accept-invitation.dto';
import { CreateOrganizationInvitationDto } from '../dto/request/create-organization-invitation.dto';
import { OrganizationRole } from '../enums/organization-role.enum';
import { requireRole } from '../middlewares/require-role.middleware';

const router = Router();

const controller =
    new OrganizationController();

router.post(
    '/',
    authMiddleware,
    validationMiddleware(
        CreateOrganizationDto
    ),
    controller.createOrganization
);

router.get(
    '/my-organizations',
    authMiddleware,
    controller.getMyOrganizations
);

router.get(
    '/:organizationId',
    authMiddleware,
    organizationAccess,
    controller.getOrganization
);

router.post(
    '/:organizationId/invitations',
    authMiddleware,
    organizationAccess,
    requireRole([
        OrganizationRole.OWNER,
        OrganizationRole.ADMIN
    ]),
    validationMiddleware(
        CreateOrganizationInvitationDto
    ),
    controller.inviteMember
);

router.post(
    '/accept-invitation',
    authMiddleware,
    validationMiddleware(
        AcceptInvitationDto
    ),
    controller.acceptInvitation
);

export default router;