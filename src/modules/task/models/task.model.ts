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
    HasMany,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

import { Project }
    from '../../project/models/project.model';

import { Sprint }
    from '../../sprint/models/sprint.model';

import { TaskStatus }
    from '../enums/task-status.enum';

import { TaskPriority }
    from '../enums/task-priority.enum';

import { TaskType }
    from '../enums/task-type.enum';

import { TaskComment } from './task-comment.model'

import { TABLE_NAMES } from '../../../shared/constants/database.constants';
import { TaskActivity } from './task-activity.model';
import { TaskAttachment } from './task-attachment.model';

@Table({
    tableName: TABLE_NAMES.TASKS,
    timestamps: true,
    paranoid: true,
})
export class Task extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.UUID)
    declare organizationId: string;

    @AllowNull(false)
    @ForeignKey(() => Project)
    @Column(DataType.UUID)
    declare projectId: string;

    @ForeignKey(() => Sprint)
    @Column(DataType.UUID)
    declare sprintId: string | null;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare taskNumber: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
        unique: true,
    })
    declare taskKey: string;

    @AllowNull(false)
    @Column(DataType.STRING(250))
    declare title: string;

    @Column(DataType.TEXT)
    declare description: string;

    @Default(TaskStatus.BACKLOG)
    @Column(
        DataType.ENUM(
            'BACKLOG',
            'TODO',
            'IN_PROGRESS',
            'IN_REVIEW',
            'DONE'
        )
    )
    declare status: TaskStatus;

    @Default(TaskPriority.MEDIUM)
    @Column(
        DataType.ENUM(
            'LOW',
            'MEDIUM',
            'HIGH',
            'CRITICAL'
        )
    )
    declare priority: TaskPriority;

    @Default(TaskType.TASK)
    @Column(
        DataType.ENUM(
            'STORY',
            'TASK',
            'BUG',
            'EPIC'
        )
    )
    declare type: TaskType;

    @AllowNull(false)
    @Column(DataType.UUID)
    declare reporterId: string;

    @Column(DataType.UUID)
    declare assigneeId: string | null;

    @Default(0)
    @Column(DataType.INTEGER)
    declare storyPoints: number;

    @Column(DataType.DATE)
    declare dueDate: Date | null;

    @BelongsTo(() => Project)
    declare project: Project;

    @BelongsTo(() => Sprint)
    declare sprint: Sprint;

    @HasMany(() => TaskComment)
    declare comments: TaskComment[];

    @HasMany(() => TaskActivity)
    declare activities: TaskActivity[];

    @HasMany(
        () => TaskAttachment
    )
    declare attachments:
        TaskAttachment[];
}
