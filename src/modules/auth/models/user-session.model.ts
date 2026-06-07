import {
  Table,
  Column,
  DataType,
  ForeignKey,
  AllowNull,
  BelongsTo
} from 'sequelize-typescript';

import { BaseModel } from '../../../database/models/base.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';
import { User } from './user.model';

@Table({
  tableName: TABLE_NAMES.USER_SESSIONS,
  timestamps: true,
  paranoid: true
})
export class UserSession extends BaseModel {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    field: 'user_id',
    type: DataType.UUID
  })
  declare userId: string;

  @Column(DataType.STRING(100))
  declare ipAddress: string;

  @Column(DataType.TEXT)
  declare userAgent: string;

  @Column(DataType.STRING(150))
  declare deviceName: string;

  @Column(DataType.DATE)
  declare lastActiveAt: Date;

  @Column(DataType.DATE)
  declare expiresAt: Date;

  @BelongsTo(() => User)
  declare user: User;
}