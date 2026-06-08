import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { RolePermission } from '../models/role-permission.model';
import { OrganizationMemberRole } from '../models/organization-member-role.model';

export class RbacRepository {

    async createRole(
        data: Partial<Role>
    ) {

        return Role.create(
            data as any
        );
    }

    async findRoleById(
        roleId: string
    ) {

        return Role.findByPk(roleId);
    }

    async findRoleByName(
        name: string
    ) {

        return Role.findOne({
            where: { name },
        });
    }

    async getRoles() {

        return Role.findAll({
            order: [['name', 'ASC']],
        });
    }

    async createPermission(
        data: Partial<Permission>
    ) {

        return Permission.create(
            data as any
        );
    }

    async findPermissionByName(
        name: string
    ) {

        return Permission.findOne({
            where: { name },
        });
    }

    async getPermissions() {

        return Permission.findAll({
            order: [['name', 'ASC']],
        });
    }

    async assignPermissionToRole(
        roleId: string,
        permissionId: string
    ) {

        return RolePermission.create({
            roleId,
            permissionId,
        } as any);
    }

    async assignRoleToMember(
        organizationMemberId: string,
        roleId: string
    ) {

        return OrganizationMemberRole.create({
            organizationMemberId,
            roleId,
        } as any);
    }

    async getMemberRoles(
        organizationMemberId: string
    ) {

        return OrganizationMemberRole.findAll({
            where: {
                organizationMemberId,
            },
            include: [Role],
        });
    }

    async getRolePermissions(
        roleId: string
    ) {

        return RolePermission.findAll({
            where: {
                roleId,
            },
            include: [Permission],
        });
    }
}