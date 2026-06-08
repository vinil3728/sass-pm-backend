import { RbacRepository }
    from '../repositories/rbac.repository';

export class RbacService {

    private readonly repository =
        new RbacRepository();

    async createRole(
        name: string,
        description: string
    ) {

        const existing =
            await this.repository
                .findRoleByName(name);

        if (existing) {
            throw new Error(
                'Role already exists'
            );
        }

        return this.repository.createRole({
            name,
            description,
            isSystemRole: false,
        });
    }

    async getRoles() {

        return this.repository
            .getRoles();
    }

    async getPermissions() {

        return this.repository
            .getPermissions();
    }

    async assignPermissionToRole(
        roleId: string,
        permissionId: string
    ) {

        return this.repository
            .assignPermissionToRole(
                roleId,
                permissionId
            );
    }

    async assignRoleToMember(
        organizationMemberId: string,
        roleId: string
    ) {

        return this.repository
            .assignRoleToMember(
                organizationMemberId,
                roleId
            );
    }

    async getMemberRoles(
        organizationMemberId: string
    ) {

        return this.repository
            .getMemberRoles(
                organizationMemberId
            );
    }
}