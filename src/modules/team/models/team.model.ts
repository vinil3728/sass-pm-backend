import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo,
    HasMany
} from 'sequelize-typescript';

import { v4 as uuidv4 }
    from 'uuid';

import { Organization }
    from '../../organization/models/organization.model';
import { ProjectTeam } from '../../project/models/project-team.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';
import { TeamMember } from './team-member.model';

@Table({
    tableName: TABLE_NAMES.TEAMS,
    timestamps: true,
    paranoid: true,
})
export class Team extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Organization)
    @Column(DataType.UUID)
    declare organizationId: string;

    @Column(DataType.STRING(100))
    declare name: string;

    @Column(DataType.TEXT)
    declare description: string;

    @BelongsTo(() => Organization)
    declare organization: Organization;

    @HasMany(() => TeamMember)
    declare members: TeamMember[];

    @HasMany(() => ProjectTeam)
    declare projectTeams: ProjectTeam[];
}