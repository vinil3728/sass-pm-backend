import {
  Table,
  Column,
  DataType,
  ForeignKey,
  AllowNull,
  BelongsTo
} from 'sequelize-typescript';

import { BaseModel } from '../../../database/models/base.model';
import { User } from './user.model';
import { UserSession } from './user-session.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
  tableName: TABLE_NAMES.REFRESH_TOKENS,
  timestamps: true,
  paranoid: true
})
export class RefreshToken extends BaseModel {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare userId: string;

  @ForeignKey(() => UserSession)
  @AllowNull(false)
  @Column(DataType.UUID)
  declare sessionId: string;

  @Column(DataType.STRING(500))
  declare tokenHash: string;

  @Column(DataType.DATE)
  declare expiresAt: Date;

  @Column(DataType.DATE)
  declare revokedAt: Date | null;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => UserSession)
  declare session: UserSession;
}