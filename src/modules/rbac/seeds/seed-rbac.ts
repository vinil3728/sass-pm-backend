import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { RolePermission } from '../models/role-permission.model';

import { SystemRole }
  from '../enums/system-role.enum';

import { Permission as PermissionEnum }
  from '../enums/permission.enum';

export async function seedRbac() {

  // =========================
  // Seed Roles
  // =========================

  const roles = [
    SystemRole.OWNER,
    SystemRole.ADMIN,
    SystemRole.PROJECT_MANAGER,
    SystemRole.TEAM_LEAD,
    SystemRole.DEVELOPER,
    SystemRole.TESTER,
    SystemRole.VIEWER,
  ];

  for (const role of roles) {

    const exists =
      await Role.findOne({
        where: { name: role },
      });

    if (!exists) {

      await Role.create({
        name: role,
        description: role,
        isSystemRole: true,
      });

    }
  }

  // =========================
  // Seed Permissions
  // =========================

  const permissions =
    Object.values(
      PermissionEnum
    );

  for (const permission of permissions) {

    const exists =
      await Permission.findOne({
        where: {
          name: permission,
        },
      });

    if (!exists) {

      await Permission.create({
        name: permission,
        description: permission,
      });

    }
  }

  // =========================
  // OWNER
  // =========================

  await assignPermissions(
    SystemRole.OWNER,
    Object.values(
      PermissionEnum
    )
  );

  // =========================
  // ADMIN
  // =========================

  await assignPermissions(
    SystemRole.ADMIN,
    [
      PermissionEnum.PROJECT_CREATE,
      PermissionEnum.PROJECT_UPDATE,
      PermissionEnum.PROJECT_DELETE,

      PermissionEnum.SPRINT_CREATE,
      PermissionEnum.SPRINT_UPDATE,

      PermissionEnum.TASK_CREATE,
      PermissionEnum.TASK_UPDATE,
      PermissionEnum.TASK_DELETE,

      PermissionEnum.TEAM_MANAGE,

      PermissionEnum.MEMBER_INVITE,

      PermissionEnum.REPORT_VIEW,
    ]
  );

  // =========================
  // PROJECT MANAGER
  // =========================

  await assignPermissions(
    SystemRole.PROJECT_MANAGER,
    [
      PermissionEnum.PROJECT_CREATE,
      PermissionEnum.PROJECT_UPDATE,

      PermissionEnum.SPRINT_CREATE,
      PermissionEnum.SPRINT_UPDATE,

      PermissionEnum.TASK_CREATE,
      PermissionEnum.TASK_UPDATE,

      PermissionEnum.REPORT_VIEW,
    ]
  );

  // =========================
  // TEAM LEAD
  // =========================

  await assignPermissions(
    SystemRole.TEAM_LEAD,
    [
      PermissionEnum.TASK_CREATE,
      PermissionEnum.TASK_UPDATE,

      PermissionEnum.TEAM_MANAGE,

      PermissionEnum.REPORT_VIEW,
    ]
  );

  // =========================
  // DEVELOPER
  // =========================

  await assignPermissions(
    SystemRole.DEVELOPER,
    [
      PermissionEnum.TASK_CREATE,
      PermissionEnum.TASK_UPDATE,
    ]
  );

  // =========================
  // TESTER
  // =========================

  await assignPermissions(
    SystemRole.TESTER,
    [
      PermissionEnum.TASK_UPDATE,
    ]
  );

  // =========================
  // VIEWER
  // =========================

  await assignPermissions(
    SystemRole.VIEWER,
    [
      PermissionEnum.REPORT_VIEW,
    ]
  );

  console.log(
    'RBAC Seed Completed'
  );
}

/**
 * Assign multiple permissions to a role
 */
async function assignPermissions(
  roleName: string,
  permissions: string[]
) {

  for (const permissionName of permissions) {

    await assignPermission(
      roleName,
      permissionName
    );

  }
}

/**
 * Assign single permission to role
 */
async function assignPermission(
  roleName: string,
  permissionName: string
) {

  const role =
    await Role.findOne({
      where: {
        name: roleName,
      },
    });

  const permission =
    await Permission.findOne({
      where: {
        name: permissionName,
      },
    });

  if (!role || !permission) {
    return;
  }

  const exists =
    await RolePermission.findOne({
      where: {
        roleId: role.id,
        permissionId: permission.id,
      },
    });

  if (!exists) {

    await RolePermission.create({
      roleId: role.id,
      permissionId: permission.id,
    });

  }
}