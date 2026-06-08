import { OrganizationMember } from '../models/organization-member.model';
import { Organization } from '../models/organization.model';

export class OrganizationMemberRepository {
    async create(
        data: Partial<OrganizationMember>
    ): Promise<OrganizationMember> {
        return OrganizationMember.create(data);
    }

    async findMember(
        organizationId: string,
        userId: string
    ): Promise<OrganizationMember | null> {
        return OrganizationMember.findOne({
            where: {
                organizationId,
                userId,
            },
        });
    }

    async findOrganizationsByUserId(
        userId: string
    ): Promise<OrganizationMember[]> {
        return OrganizationMember.findAll({
            where: {
                userId,
            },
            include: [
                {
                    model: Organization,
                },
            ],
        });
    }

    async findByOrganizationAndUser(
        organizationId: string,
        userId: string
    ): Promise<OrganizationMember | null> {
        return OrganizationMember.findOne({
            where: {
                organizationId,
                userId,
            },
        });
    }
}