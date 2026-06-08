import { Team } from '../models/team.model';

export class TeamRepository {

    async create(
        data: Partial<Team>
    ): Promise<Team> {

        return Team.create(
            data as any
        );
    }

    async findById(
        teamId: string
    ): Promise<Team | null> {

        return Team.findByPk(teamId);
    }

    async findByOrganization(
        organizationId: string
    ): Promise<Team[]> {

        return Team.findAll({
            where: {
                organizationId,
            },
            order: [
                ['createdAt', 'DESC']
            ],
        });
    }

    async update(
        teamId: string,
        data: Partial<Team>
    ): Promise<void> {

        await Team.update(
            data,
            {
                where: {
                    id: teamId,
                },
            }
        );
    }

    async delete(
        teamId: string
    ): Promise<void> {

        await Team.destroy({
            where: {
                id: teamId,
            },
        });
    }
}