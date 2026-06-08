import { Response } from 'express';

import { OrganizationService } from '../services/organization.service';

import { AuthRequest } from '../../../shared/middleware/auth.middleware';

export class OrganizationController {
    private readonly organizationService =
        new OrganizationService();

    createOrganization = async (
        req: AuthRequest,
        res: Response
    ) => {
        const result =
            await this.organizationService.createOrganization(
                req.user!.userId,
                req.body
            );

        return res.status(201).json({
            success: true,
            message:
                'Organization created successfully',
            data: result,
        });
    };

    getMyOrganizations = async (
        req: AuthRequest,
        res: Response
    ) => {
        const result =
            await this.organizationService
                .getMyOrganizations(
                    req.user!.userId
                );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    getOrganization = async (
        req: AuthRequest,
        res: Response
    ) => {
        const organizationId = Array.isArray(req.params.organizationId)
            ? req.params.organizationId[0]
            : req.params.organizationId;

        const result =
            await this.organizationService
                .getOrganization(organizationId);

        return res.status(200).json({
            success: true,
            data: result,
        });
    };

    inviteMember = async (
        req: AuthRequest,
        res: Response
    ) => {

        const result =
            await this.organizationService
                .inviteMember(
                    req.params.organizationId as string,
                    req.body.email,
                    req.body.role
                );

        return res.status(201).json({
            success: true,
            data: result,
        });
    };

    acceptInvitation = async (
        req: AuthRequest,
        res: Response
    ) => {

        const result =
            await this.organizationService
                .acceptInvitation(
                    req.user!.userId,
                    req.body.token
                );

        return res.status(200).json({
            success: true,
            data: result,
        });
    };
}