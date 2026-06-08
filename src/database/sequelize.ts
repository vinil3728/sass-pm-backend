import 'reflect-metadata';
import { env } from '../config/env';

import { Sequelize } from 'sequelize-typescript';

import { User } from '../modules/auth/models/user.model';
import { UserProfile } from '../modules/auth/models/user-profile.model';
import { RefreshToken } from '../modules/auth/models/refresh-token.model';
import { EmailVerification } from '../modules/auth/models/email-verification.model';
import { PasswordReset } from '../modules/auth/models/password-reset.model';
import { AuditLog } from '../modules/auth/models/audit-log.model';
import { UserSession } from '../modules/auth/models/user-session.model';
import { Organization } from '../modules/organization/models/organization.model';
import { OrganizationMember } from '../modules/organization/models/organization-member.model';
import { OrganizationInvitation } from '../modules/organization/models/organization-invitation.model';
import { Project } from '../modules/project/models/project.model';
import { Sprint } from '../modules/sprint/models/sprint.model';
import { Task } from '../modules/task/models/task.model';
import { TaskComment } from '../modules/task/models/task-comment.model';
import { TaskActivity } from '../modules/task/models/task-activity.model';
import { TaskAttachment } from '../modules/task/models/task-attachment.model';
import { Notification } from '../modules/notification/models/notification.model';
import { Team } from '../modules/team/models/team.model';
import { TeamMember } from '../modules/team/models/team-member.model'
import { ProjectTeam } from '../modules/project/models/project-team.model';
import { Role } from '../modules/rbac/models/role.model';
import { Permission } from '../modules/rbac/models/permission.model';
import { RolePermission } from '../modules/rbac/models/role-permission.model';
import { OrganizationMemberRole } from '../modules/rbac/models/organization-member-role.model';

export const sequelize = new Sequelize({
  dialect: 'mysql',

  host: env.DB_HOST,
  port: env.DB_PORT,

  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  logging: false,
  models: [
    User,
    UserProfile,
    UserSession,
    RefreshToken,
    EmailVerification,
    PasswordReset,
    AuditLog,
    Organization,
    OrganizationMember,
    OrganizationInvitation,
    Project,
    Sprint,
    Task,
    TaskComment,
    TaskActivity,
    TaskAttachment,
    Notification,
    Team,
    TeamMember,
    ProjectTeam,
    Role,
    Permission,
    RolePermission,
    OrganizationMemberRole,
  ]
});