import { TeamRepository } from '../repositories/team.repository';
import { TeamMemberRepository } from '../repositories/team-member.repository';

import { CreateTeamDto } from '../dto/request/create-team.dto';
import { UpdateTeamDto } from '../dto/request/update-team.dto';

export class TeamService {

    private readonly teamRepository =
        new TeamRepository();

    private readonly memberRepository =
        new TeamMemberRepository();

    async createTeam(
        organizationId: string,
        dto: CreateTeamDto
    ) {

        return this.teamRepository.create({
            organizationId,
            name: dto.name,
            description: dto.description,
        });
    }

    async updateTeam(
        teamId: string,
        dto: UpdateTeamDto
    ) {

        const team =
            await this.teamRepository.findById(
                teamId
            );

        if (!team) {
            throw new Error(
                'Team not found'
            );
        }

        await this.teamRepository.update(
            teamId,
            dto
        );

        return this.teamRepository.findById(
            teamId
        );
    }

    async deleteTeam(
        teamId: string
    ) {

        const team =
            await this.teamRepository.findById(
                teamId
            );

        if (!team) {
            throw new Error(
                'Team not found'
            );
        }

        await this.teamRepository.delete(
            teamId
        );

        return {
            success: true,
        };
    }

    async getTeam(
        teamId: string
    ) {

        const team =
            await this.teamRepository.findById(
                teamId
            );

        if (!team) {
            throw new Error(
                'Team not found'
            );
        }

        return team;
    }

    async getOrganizationTeams(
        organizationId: string
    ) {

        const teams =
            await this.teamRepository
                .findByOrganization(
                    organizationId
                );

        const result = await Promise.all(
            teams.map(async team => {

                const memberCount =
                    await this.memberRepository
                        .countMembers(
                            team.id
                        );

                return {
                    ...team.toJSON(),
                    memberCount,
                };
            })
        );

        return result;
    }

    async addMember(
        teamId: string,
        userId: string,
        addedBy: string
    ) {

        const team =
            await this.teamRepository.findById(
                teamId
            );

        if (!team) {
            throw new Error(
                'Team not found'
            );
        }

        const exists =
            await this.memberRepository
                .isMember(
                    teamId,
                    userId
                );

        if (exists) {
            throw new Error(
                'User already exists in team'
            );
        }

        return this.memberRepository
            .addMember({
                teamId,
                userId,
                addedBy,
            });
    }

    async removeMember(
        teamId: string,
        userId: string
    ) {

        await this.memberRepository
            .removeMember(
                teamId,
                userId
            );

        return {
            success: true,
        };
    }

    async getTeamMembers(
        teamId: string
    ) {

        return this.memberRepository
            .findMembers(
                teamId
            );
    }
}