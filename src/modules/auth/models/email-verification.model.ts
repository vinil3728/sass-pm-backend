import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import { BaseModel } from '../../../database/models/base.model';
import { User } from './user.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
  tableName: TABLE_NAMES.EMAIL_VERIFICATIONS,
  timestamps: true,
  paranoid: true
})
export class EmailVerification extends BaseModel {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: string;

  @Column(DataType.STRING(255))
  declare token: string;

  @Column(DataType.DATE)
  declare expiresAt: Date;

  @Column(DataType.DATE)
  declare verifiedAt: Date | null;

  @BelongsTo(() => User)
  declare user: User;
}