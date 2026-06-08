import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey,
    BelongsTo,
    Index
} from 'sequelize-typescript';

import { v4 as uuidv4 }
    from 'uuid';

import { Team }
    from './team.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.TEAM_MEMBERS,
    timestamps: true,
})
export class TeamMember extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @Index({
        name: 'idx_team_user_unique',
        unique: true
    }) @ForeignKey(() => Team)
    @Column(DataType.UUID)
    declare teamId: string;

    @Index({
        name: 'idx_team_user_unique',
        unique: true
    })
    @Column(DataType.UUID)
    declare userId: string;

    @Column(DataType.UUID)
    declare addedBy: string;

    @BelongsTo(() => Team)
    declare team: Team;
}