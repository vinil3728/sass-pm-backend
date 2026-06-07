import {
  Table,
  Column,
  DataType,
  Unique,
  AllowNull,
  Default,
} from 'sequelize-typescript';

import { BaseModel } from '../../../database/models/base.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';
import { UserStatus } from '../../../shared/enums/user-status.enum';

import { HasOne, HasMany } from 'sequelize-typescript';
import { UserProfile } from './user-profile.model';
import { UserSession } from './user-session.model';
import { RefreshToken } from './refresh-token.model';
import { EmailVerification } from './email-verification.model';
import { PasswordReset } from './password-reset.model';
import { AuditLog } from './audit-log.model';

@Table({
  tableName: TABLE_NAMES.USERS,
  paranoid: true,
  timestamps: true,
})
export class User extends BaseModel {
  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    field: 'password_hash',
    type: DataType.STRING(255),
  })
  declare passwordHash: string;

  @Default(false)
  @Column({
    field: 'is_email_verified',
    type: DataType.BOOLEAN,
  })
  declare isEmailVerified: boolean;

  @Default(UserStatus.ACTIVE)
  @Column({
    type: DataType.ENUM(
      UserStatus.ACTIVE,
      UserStatus.INACTIVE,
      UserStatus.LOCKED,
      UserStatus.SUSPENDED
    ),
  })
  declare status: UserStatus;

  @Default(0)
  @Column({
    field: 'failed_login_attempts',
    type: DataType.INTEGER,
  })
  declare failedLoginAttempts: number;

  @Column({
    field: 'locked_until',
    type: DataType.DATE,
  })
  declare lockedUntil: Date | null;

  @HasOne(() => UserProfile)
  declare profile: UserProfile;

  @HasMany(() => UserSession)
  declare sessions: UserSession[];

  @HasMany(() => RefreshToken)
  declare refreshTokens: RefreshToken[];

  @HasMany(() => EmailVerification)
  declare emailVerifications: EmailVerification[];

  @HasMany(() => PasswordReset)
  declare passwordResets: PasswordReset[];

  @HasMany(() => AuditLog)
  declare auditLogs: AuditLog[];
}