import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

import { OrganizationMember }
    from '../../organization/models/organization-member.model';

import { Role }
    from './role.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.ORGANIZATION_MEMBER_ROLES,
    timestamps: true,
})
export class OrganizationMemberRole extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => OrganizationMember)
    @Column(DataType.UUID)
    declare organizationMemberId: string;

    @ForeignKey(() => Role)
    @Column(DataType.UUID)
    declare roleId: string;
}