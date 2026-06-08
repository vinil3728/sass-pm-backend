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

import { Project } from '../../project/models/project.model';

import { SprintStatus } from '../enums/sprint-status.enum';
import { Organization } from '../../organization/models/organization.model';
import { Task } from '../../task/models/task.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.SPRINTS,
    timestamps: true,
    paranoid: true,
})
export class Sprint extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare projectId: string;

    @ForeignKey(() => Organization)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare organizationId: string;

    @AllowNull(false)
    @Column(DataType.STRING(150))
    declare name: string;

    @Column(DataType.TEXT)
    declare goal: string;

    @AllowNull(false)
    @Default(SprintStatus.PLANNED)
    @Column(
        DataType.ENUM(
            'PLANNED',
            'ACTIVE',
            'COMPLETED',
            'CANCELLED'
        )
    )
    declare status: SprintStatus;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare startDate: Date;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare endDate: Date;

    @AllowNull(false)
    @Column(DataType.UUID)
    declare createdBy: string;

    @BelongsTo(() => Project)
    declare project: Project;

    @HasMany(() => Task)
    declare tasks: Task[];
}