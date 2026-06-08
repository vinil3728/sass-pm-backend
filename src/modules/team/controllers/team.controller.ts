import { Response } from 'express';

import { TeamService }
    from '../services/team.service';

import { AuthenticatedRequest }
    from '../../../shared/types/authenticated-request';

export class TeamController {

    private readonly service =
        new TeamService();

    createTeam = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service.createTeam(
                req.params.organizationId as string,
                req.body
            );

        return res.status(201)
            .json({
                success: true,
                data: result,
            });
    };

    updateTeam = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service.updateTeam(
                req.params.teamId as string,
                req.body
            );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };

    deleteTeam = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service.deleteTeam(
                req.params.teamId as string
            );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };

    getTeam = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service.getTeam(
                req.params.teamId as string
            );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };

    getOrganizationTeams = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service
                .getOrganizationTeams(
                    req.params.organizationId as string
                );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };

    addMember = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service.addMember(
                req.params.teamId as string,
                req.body.userId,
                req.user!.userId
            );

        return res.status(201)
            .json({
                success: true,
                data: result,
            });
    };

    removeMember = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service.removeMember(
                req.params.teamId as string,
                req.body.userId
            );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };

    getTeamMembers = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service
                .getTeamMembers(
                    req.params.teamId as string
                );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };
}