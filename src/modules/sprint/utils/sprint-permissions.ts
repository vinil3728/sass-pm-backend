import { OrganizationRole }
    from '../../organization/enums/organization-role.enum';

export class SprintPermissions {

    static canCreateSprint(
        role: OrganizationRole
    ): boolean {
        return [
            OrganizationRole.OWNER,
            OrganizationRole.ADMIN,
            OrganizationRole.MEMBER
        ].includes(role);
    }

    static canStartSprint(
        role: OrganizationRole
    ): boolean {
        return [
            OrganizationRole.OWNER,
            OrganizationRole.ADMIN
        ].includes(role);
    }

    static canCompleteSprint(
        role: OrganizationRole
    ): boolean {
        return [
            OrganizationRole.OWNER,
            OrganizationRole.ADMIN
        ].includes(role);
    }
}