import { Organization } from '../models/organization.model';

export class OrganizationRepository {
    async create(
        data: Partial<Organization>
    ): Promise<Organization> {
        return Organization.create(data);
    }

    async findById(
        id: string
    ): Promise<Organization | null> {
        return Organization.findByPk(id);
    }

    async findBySlug(
        slug: string
    ): Promise<Organization | null> {
        return Organization.findOne({
            where: {
                slug,
            },
        });
    }

    async findWithMembers(
        organizationId: string
    ): Promise<Organization | null> {
        return Organization.findByPk(
            organizationId,
            {
                include: [
                    {
                        association: 'members',
                    },
                ],
            }
        );
    }
}