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
import { OrganizationMember } from './organization-member.model';
import { OrganizationInvitation } from './organization-invitation.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.ORGANIZATIONS,
    timestamps: true,
    paranoid: true,
})
export class Organization extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.STRING(150))
    declare name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(150),
        unique: true,
    })
    declare slug: string;

    @Column(DataType.TEXT)
    declare description: string;

    @Column(DataType.STRING)
    declare logoUrl: string;

    @AllowNull(false)
    @Column(DataType.UUID)
    declare createdBy: string;

    @HasMany(() => OrganizationMember)
    declare members: OrganizationMember[];

    @HasMany(() => OrganizationInvitation)
    declare invitations: OrganizationInvitation[];
}