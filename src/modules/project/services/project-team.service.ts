import { ProjectRepository }
    from '../repositories/project.repository';

import { ProjectTeamRepository }
    from '../repositories/project-team.repository';

import { TeamRepository }
    from '../../team/repositories/team.repository';

export class ProjectTeamService {

    private readonly projectRepository =
        new ProjectRepository();

    private readonly projectTeamRepository =
        new ProjectTeamRepository();

    private readonly teamRepository =
        new TeamRepository();

    async assignTeamToProject(
        projectId: string,
        teamId: string,
        addedBy: string
    ) {

        const project =
            await this.projectRepository
                .findById(projectId);

        if (!project) {
            throw new Error(
                'Project not found'
            );
        }

        const team =
            await this.teamRepository
                .findById(teamId);

        if (!team) {
            throw new Error(
                'Team not found'
            );
        }

        const alreadyAssigned =
            await this.projectTeamRepository
                .isAssigned(
                    projectId,
                    teamId
                );

        if (alreadyAssigned) {
            throw new Error(
                'Team already assigned'
            );
        }

        return this.projectTeamRepository
            .assignTeam({
                projectId,
                teamId,
                addedBy,
            });
    }

    async removeTeamFromProject(
        projectId: string,
        teamId: string
    ) {

        await this.projectTeamRepository
            .removeTeam(
                projectId,
                teamId
            );

        return {
            success: true,
        };
    }

    async getProjectTeams(
        projectId: string
    ) {

        return this.projectTeamRepository
            .findProjectTeams(
                projectId
            );
    }
}