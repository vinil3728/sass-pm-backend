import { OrganizationRole } from '../enums/organization-role.enum';

export class OrganizationPermissions {
    static canManageMembers(
        role: OrganizationRole
    ): boolean {
        return [
            OrganizationRole.OWNER,
            OrganizationRole.ADMIN
        ].includes(role);
    }

    static canEditOrganization(
        role: OrganizationRole
    ): boolean {
        return [
            OrganizationRole.OWNER,
            OrganizationRole.ADMIN
        ].includes(role);
    }

    static canDeleteOrganization(
        role: OrganizationRole
    ): boolean {
        return role === OrganizationRole.OWNER;
    }

    static canCreateProjects(
        role: OrganizationRole
    ): boolean {
        return [
            OrganizationRole.OWNER,
            OrganizationRole.ADMIN,
            OrganizationRole.MEMBER
        ].includes(role);
    }
}
