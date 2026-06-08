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

import { Organization }
    from '../../organization/models/organization.model';

import { ProjectStatus }
    from '../../project/enums/project-status.enum'
import { Sprint } from '../../sprint/models/sprint.model';
import { Task } from '../../task/models/task.model';
import { ProjectTeam } from '../../project/models/project-team.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.PROJECTS,
    timestamps: true,
    paranoid: true,
})
export class Project extends Model {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Organization)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare organizationId: string;

    @AllowNull(false)
    @Column(DataType.STRING(150))
    declare name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(20),
        unique: true,
    })
    declare key: string;

    @Column(DataType.TEXT)
    declare description: string;

    @AllowNull(false)
    @Default(ProjectStatus.PLANNING)
    @Column(
        DataType.ENUM(
            'PLANNING',
            'ACTIVE',
            'ON_HOLD',
            'COMPLETED',
            'ARCHIVED'
        )
    )
    declare status: ProjectStatus;

    @AllowNull(false)
    @Column(DataType.UUID)
    declare createdBy: string;

    @Column(DataType.DATE)
    declare startDate: Date;

    @Column(DataType.DATE)
    declare endDate: Date;

    @BelongsTo(() => Organization)
    declare organization: Organization;

    @HasMany(() => Sprint)
    declare sprints: Sprint[];

    @HasMany(() => Task)
    declare tasks: Task[];

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    declare nextTaskNumber: number;

    @HasMany(() => ProjectTeam)
    declare projectTeams: ProjectTeam[];
}