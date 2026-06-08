import { OrganizationRepository } from '../repositories/organization.repository';
import { OrganizationMemberRepository } from '../repositories/organization-member.repository';

import { OrganizationRole } from '../enums/organization-role.enum';

import { SlugUtil } from '../../../shared/utils/slug.util';
import { HashUtil } from '../../../shared/utils/security/hash.util';
import { InvitationTokenUtil } from '../../../shared/utils/invitation-token.util';
import { OrganizationInvitationRepository } from '../repositories/organization-invitation.repository';
import { NotificationType } from '../../notification/enums/notification-type.enum';

export class OrganizationService {
    constructor(
        private readonly organizationRepository =
            new OrganizationRepository(),

        private readonly organizationMemberRepository =
            new OrganizationMemberRepository(),

        private readonly invitationRepository =
            new OrganizationInvitationRepository()
    ) { }

    async createOrganization(
        userId: string,
        data: {
            name: string;
            description?: string;
        }
    ) {
        const slug =
            SlugUtil.generate(data.name);

        const existing =
            await this.organizationRepository.findBySlug(
                slug
            );

        if (existing) {
            throw new Error(
                'Organization name already exists'
            );
        }

        const organization =
            await this.organizationRepository.create({
                name: data.name,
                description: data.description,
                slug,
                createdBy: userId,
            });

        await this.organizationMemberRepository.create({
            organizationId: organization.id,
            userId,
            role: OrganizationRole.OWNER,
        });

        return organization;
    }

    async getMyOrganizations(
        userId: string
    ) {
        const memberships =
            await this.organizationMemberRepository
                .findOrganizationsByUserId(
                    userId
                );

        return memberships.map(
            membership => ({
                id: membership.organization.id,
                name:
                    membership.organization.name,
                slug:
                    membership.organization.slug,
                role: membership.role,
            })
        );
    }

    async getOrganization(
        organizationId: string
    ) {
        const organization =
            await this.organizationRepository
                .findWithMembers(
                    organizationId
                );

        if (!organization) {
            throw new Error(
                'Organization not found'
            );
        }

        return organization;
    }

    async inviteMember(
        organizationId: string,
        email: string,
        role: OrganizationRole
    ) {
        const token =
            InvitationTokenUtil.generate();

        const tokenHash =
            HashUtil.sha256(token);

        const invitation =
            await this.invitationRepository.create({
                organizationId,
                email,
                role,
                tokenHash,
                expiresAt: new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000
                ),
            });

        return {
            invitationId: invitation.id,
            token,
        };
    }

    async acceptInvitation(
        userId: string,
        token: string
    ) {
        const tokenHash =
            HashUtil.sha256(token);

        const invitation =
            await this.invitationRepository
                .findByTokenHash(tokenHash);

        if (!invitation) {
            throw new Error(
                'Invitation not found'
            );
        }

        if (invitation.acceptedAt) {
            throw new Error(
                'Invitation already accepted'
            );
        }

        if (
            invitation.expiresAt <
            new Date()
        ) {
            throw new Error(
                'Invitation expired'
            );
        }

        await this.organizationMemberRepository
            .create({
                organizationId:
                    invitation.organizationId,
                userId,
                role: invitation.role,
            });

        await this.invitationRepository
            .markAccepted(
                invitation.id
            );

        return {
            success: true,
        };
    }
}