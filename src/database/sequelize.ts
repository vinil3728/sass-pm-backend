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
    AuditLog
  ]
});