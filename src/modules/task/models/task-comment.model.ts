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
import { Task } from './task.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.TASK_COMMENTS,
    timestamps: true,
    paranoid: true,
})
export class TaskComment extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Task)
    @Column(DataType.UUID)
    declare taskId: string;

    @Column(DataType.UUID)
    declare userId: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare comment: string;

    @BelongsTo(() => Task)
    declare task: Task;
}