import { ProjectTeam } from '../models/project-team.model';

export class ProjectTeamRepository {

    async assignTeam(
        data: Partial<ProjectTeam>
    ): Promise<ProjectTeam> {

        return ProjectTeam.create(
            data as any
        );
    }

    async removeTeam(
        projectId: string,
        teamId: string
    ): Promise<void> {

        await ProjectTeam.destroy({
            where: {
                projectId,
                teamId,
            },
        });
    }

    async findProjectTeams(
        projectId: string
    ): Promise<ProjectTeam[]> {

        return ProjectTeam.findAll({
            where: {
                projectId,
            },
        });
    }

    async isAssigned(
        projectId: string,
        teamId: string
    ): Promise<boolean> {

        const mapping =
            await ProjectTeam.findOne({
                where: {
                    projectId,
                    teamId,
                },
            });

        return !!mapping;
    }
}