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
  tableName: TABLE_NAMES.AUDIT_LOGS,
  timestamps: true,
  paranoid: false
})
export class AuditLog extends BaseModel {
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: string;

  @Column(DataType.STRING(100))
  declare eventType: string;

  @Column(DataType.STRING(100))
  declare entityType: string;

  @Column(DataType.UUID)
  declare entityId: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column(DataType.JSON)
  declare metadata: Record<string, unknown>;

  @BelongsTo(() => User)
  declare user: User;
}