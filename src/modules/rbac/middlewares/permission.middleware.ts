import {
    NextFunction,
    Response
} from 'express';

import { AuthenticatedRequest }
    from '../../../shared/types/authenticated-request';

import { OrganizationMember }
    from '../../organization/models/organization-member.model';

import { OrganizationMemberRole }
    from '../models/organization-member-role.model';

import { RolePermission }
    from '../models/role-permission.model';

import { Permission }
    from '../models/permission.model';

export const permissionMiddleware =
    (permissionName: string) => {

        return async (
            req: AuthenticatedRequest,
            res: Response,
            next: NextFunction
        ) => {

            try {

                const organizationId =
                    req.params.organizationId;

                const userId =
                    req.user?.userId;

                const member =
                    await OrganizationMember.findOne({
                        where: {
                            organizationId,
                            userId,
                        },
                    });

                if (!member) {
                    return res.status(403).json({
                        success: false,
                        message: 'Organization member not found',
                    });
                }

                const memberRoles =
                    await OrganizationMemberRole.findAll({
                        where: {
                            organizationMemberId: member.id,
                        },
                    });

                const roleIds =
                    memberRoles.map(
                        role => role.roleId
                    );

                const rolePermissions =
                    await RolePermission.findAll({
                        where: {
                            roleId: roleIds,
                        },
                        include: [Permission],
                    });

                const hasPermission =
                    rolePermissions.some(
                        item =>
                            (item as any).permission?.name ===
                            permissionName
                    );

                if (!hasPermission) {

                    return res.status(403).json({
                        success: false,
                        message: 'Permission denied',
                    });
                }

                next();

            } catch (error) {

                next(error);

            }
        };
    };