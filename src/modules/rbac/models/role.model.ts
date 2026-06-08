import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    HasMany
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';
import { RolePermission } from './role-permission.model';

@Table({
    tableName: TABLE_NAMES.ROLES,
    timestamps: true,
})
export class Role extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare name: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    declare description: string;

    @Default(true)
    @Column(DataType.BOOLEAN)
    declare isSystemRole: boolean;

    @HasMany(() => RolePermission)
    declare permissions: RolePermission[];
}