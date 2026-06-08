import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

import { Project } from './project.model';
import { Team } from '../../team/models/team.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.PROJECT_TEAMS,
    timestamps: true,
})
export class ProjectTeam extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Project)
    @Column(DataType.UUID)
    declare projectId: string;

    @ForeignKey(() => Team)
    @Column(DataType.UUID)
    declare teamId: string;

    @Column(DataType.UUID)
    declare addedBy: string;
}