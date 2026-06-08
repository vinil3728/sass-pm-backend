import { OrganizationRole }
    from '../../organization/enums/organization-role.enum';

export class ProjectPermissions {

    static canCreateSprint(
        role: OrganizationRole
    ): boolean {
        return [
            OrganizationRole.OWNER,
            OrganizationRole.ADMIN,
            OrganizationRole.MEMBER
        ].includes(role);
    }

    static canArchiveProject(
        role: OrganizationRole
    ): boolean {
        return [
            OrganizationRole.OWNER,
            OrganizationRole.ADMIN
        ].includes(role);
    }

    static canDeleteProject(
        role: OrganizationRole
    ): boolean {
        return role ===
            OrganizationRole.OWNER;
    }
}