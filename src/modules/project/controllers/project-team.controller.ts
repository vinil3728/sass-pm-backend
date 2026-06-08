import { Response }
    from 'express';

import { ProjectTeamService }
    from '../services/project-team.service';

import { AuthenticatedRequest }
    from '../../../shared/types/authenticated-request';

export class ProjectTeamController {

    private readonly service =
        new ProjectTeamService();

    assignTeam = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service
                .assignTeamToProject(
                    req.params.projectId as string,
                    req.body.teamId,
                    req.user!.userId
                );

        return res.status(201)
            .json({
                success: true,
                data: result,
            });
    };

    removeTeam = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service
                .removeTeamFromProject(
                    req.params.projectId as string,
                    req.params.teamId as string
                );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };

    getProjectTeams = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.service
                .getProjectTeams(
                    req.params.projectId as string
                );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };
}