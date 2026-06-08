import { Task } from "../../modules/task/models/task.model";

export const TABLE_NAMES = {
  USERS: 'users',
  USER_PROFILES: 'user_profiles',
  USER_SESSIONS: 'user_sessions',
  REFRESH_TOKENS: 'refresh_tokens',
  EMAIL_VERIFICATIONS: 'email_verifications',
  PASSWORD_RESETS: 'password_resets',
  AUDIT_LOGS: 'audit_logs',
  ORGANIZATIONS: 'organizations',
  ORGANIZATION_MEMBERS: 'organization_members',
  ORGANIZATION_INVITATIONS: 'organization_invitations',
  PROJECTS: 'projects',
  SPRINTS: 'sprints',
  TASKS: 'tasks',
  TASK_COMMENTS: 'task_comments',
  TASK_ACTIVITIES: 'task_activities',
  TASK_ATTACHMENTS: 'task_attachments',

} as const;