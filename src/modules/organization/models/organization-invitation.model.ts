import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

import { Organization } from './organization.model';

import { OrganizationRole } from '../enums/organization-role.enum';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.ORGANIZATION_INVITATIONS,
    timestamps: true,
})
export class OrganizationInvitation extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Organization)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare organizationId: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare email: string;

    @AllowNull(false)
    @Column(
        DataType.ENUM(
            'OWNER',
            'ADMIN',
            'MEMBER',
            'VIEWER'
        )
    )
    declare role: OrganizationRole;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare tokenHash: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare expiresAt: Date;

    @Column(DataType.DATE)
    declare acceptedAt: Date;

    @BelongsTo(() => Organization)
    declare organization: Organization;
}