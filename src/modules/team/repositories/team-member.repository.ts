import { TeamMember }
    from '../models/team-member.model';

export class TeamMemberRepository {

    async addMember(
        data: Partial<TeamMember>
    ): Promise<TeamMember> {

        return TeamMember.create(
            data as any
        );
    }

    async removeMember(
        teamId: string,
        userId: string
    ): Promise<void> {

        await TeamMember.destroy({
            where: {
                teamId,
                userId,
            },
        });
    }

    async findMembers(
        teamId: string
    ): Promise<TeamMember[]> {

        return TeamMember.findAll({
            where: {
                teamId,
            },
            order: [
                ['createdAt', 'ASC']
            ],
        });
    }

    async isMember(
        teamId: string,
        userId: string
    ): Promise<boolean> {

        const member =
            await TeamMember.findOne({
                where: {
                    teamId,
                    userId,
                },
            });

        return !!member;
    }

    async countMembers(
        teamId: string
    ): Promise<number> {

        return TeamMember.count({
            where: {
                teamId,
            },
        });
    }
}