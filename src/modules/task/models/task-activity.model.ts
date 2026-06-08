import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    ForeignKey,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.model';
import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.TASK_ACTIVITIES,
    timestamps: true,
    paranoid: true,
})
export class TaskActivity extends Model {

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
    @Column(DataType.STRING(100))
    declare action: string;

    @Column(DataType.JSON)
    declare metadata: object;
}