import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    ForeignKey
} from 'sequelize-typescript';

import { v4 as uuidv4 }
    from 'uuid';

import { Task }
    from './task.model';

@Table({
    tableName: 'task_attachments',
    timestamps: true,
    paranoid: true,
})
export class TaskAttachment extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Task)
    @Column(DataType.UUID)
    declare taskId: string;

    @Column(DataType.UUID)
    declare uploadedBy: string;

    @Column(DataType.STRING(255))
    declare originalName: string;

    @Column(DataType.STRING(255))
    declare storedName: string;

    @Column(DataType.STRING(500))
    declare filePath: string;

    @Column(DataType.STRING(100))
    declare mimeType: string;

    @Column(DataType.BIGINT)
    declare fileSize: number;
}