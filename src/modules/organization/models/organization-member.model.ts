import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    ForeignKey,
    BelongsTo,
    HasMany
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

import { Organization } from './organization.model';
import { User } from '../../auth/models/user.model';
import { OrganizationMemberRole } from '../../rbac/models/organization-member-role.model';

import { OrganizationRole } from '../enums/organization-role.enum';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.ORGANIZATION_MEMBERS,
    timestamps: true,
    paranoid: true,
})
export class OrganizationMember extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Organization)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare organizationId: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare userId: string;

    @AllowNull(false)
    @Default(OrganizationRole.MEMBER)
    @Column(
        DataType.ENUM(
            'OWNER',
            'ADMIN',
            'MEMBER',
            'VIEWER'
        )
    )
    declare role: OrganizationRole;

    @BelongsTo(() => Organization)
    declare organization: Organization;

    @BelongsTo(() => User)
    declare user: User;

    @HasMany(() => OrganizationMemberRole)
    declare memberRoles: OrganizationMemberRole[];
}