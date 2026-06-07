import {
  Table,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Unique
} from 'sequelize-typescript';

import { BaseModel } from '../../../database/models/base.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';
import { User } from './user.model';

@Table({
  tableName: TABLE_NAMES.USER_PROFILES,
  timestamps: true,
  paranoid: true
})
export class UserProfile extends BaseModel {
  @ForeignKey(() => User)
  @Unique
  @AllowNull(false)
  @Column({
    field: 'user_id',
    type: DataType.UUID
  })
  declare userId: string;

  @Column({
    field: 'first_name',
    type: DataType.STRING(100)
  })
  declare firstName: string;

  @Column({
    field: 'last_name',
    type: DataType.STRING(100)
  })
  declare lastName: string;

  @Column({
    field: 'avatar_url',
    type: DataType.STRING(500)
  })
  declare avatarUrl: string;

  @Column({
    type: DataType.STRING(100)
  })
  declare timezone: string;

  @BelongsTo(() => User)
  declare user: User;
}