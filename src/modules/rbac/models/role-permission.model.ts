import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

import { Role } from './role.model';
import { Permission } from './permission.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.ROLE_PERMISSIONS,
    timestamps: true,
})
export class RolePermission extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Role)
    @Column(DataType.UUID)
    declare roleId: string;

    @ForeignKey(() => Permission)
    @Column(DataType.UUID)
    declare permissionId: string;

    @BelongsTo(() => Role)
    declare role: Role;

    @BelongsTo(() => Permission)
    declare permission: Permission;
}