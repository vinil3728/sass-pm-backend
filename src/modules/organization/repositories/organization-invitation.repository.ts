import { OrganizationInvitation }
    from '../models/organization-invitation.model';

export class OrganizationInvitationRepository {

    async create(
        data: Partial<OrganizationInvitation>
    ): Promise<OrganizationInvitation> {
        return OrganizationInvitation.create(data);
    }

    async findByTokenHash(
        tokenHash: string
    ): Promise<OrganizationInvitation | null> {
        return OrganizationInvitation.findOne({
            where: {
                tokenHash,
            },
        });
    }

    async markAccepted(
        id: string
    ): Promise<void> {
        await OrganizationInvitation.update(
            {
                acceptedAt: new Date(),
            },
            {
                where: { id }
            }
        );
    }
}