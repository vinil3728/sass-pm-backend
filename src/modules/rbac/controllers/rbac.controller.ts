import { Request, Response }
    from 'express';

import { RbacService }
    from '../services/rbac.service';

export class RbacController {

    private readonly service =
        new RbacService();

    createRole = async (
        req: Request,
        res: Response
    ) => {

        const result =
            await this.service.createRole(
                req.body.name,
                req.body.description
            );

        return res.status(201).json({
            success: true,
            data: result,
        });
    };

    getRoles = async (
        req: Request,
        res: Response
    ) => {

        const result =
            await this.service.getRoles();

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    getPermissions = async (
        req: Request,
        res: Response
    ) => {

        const result =
            await this.service.getPermissions();

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    assignPermissionToRole =
        async (
            req: Request,
            res: Response
        ) => {

            const result =
                await this.service
                    .assignPermissionToRole(
                        req.params.roleId as string,
                        req.body.permissionId
                    );

            return res.status(201).json({
                success: true,
                data: result,
            });
        };

    assignRoleToMember =
        async (
            req: Request,
            res: Response
        ) => {

            const result =
                await this.service
                    .assignRoleToMember(
                        req.params.organizationMemberId as string,
                        req.body.roleId
                    );

            return res.status(201).json({
                success: true,
                data: result,
            });
        };

    getMemberRoles =
        async (
            req: Request,
            res: Response
        ) => {

            const result =
                await this.service
                    .getMemberRoles(
                        req.params.organizationMemberId as string
                    );

            return res.status(200).json({
                success: true,
                data: result,
            });
        };
}