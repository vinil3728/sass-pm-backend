import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    PrimaryKey
} from 'sequelize-typescript';

import { v4 as uuidv4 }
    from 'uuid';

import { NotificationType }
    from '../enums/notification-type.enum';

import { TABLE_NAMES } from '../../../shared/constants/database.constants';

@Table({
    tableName: TABLE_NAMES.NOTIFICATIONS,
    paranoid: true,
    timestamps: true,
})
export class Notification
    extends Model {

    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @Column(DataType.UUID)
    declare userId: string;

    @Column(
        DataType.ENUM(
            'TASK_ASSIGNED',
            'TASK_COMMENT',
            'TASK_STATUS_CHANGED',
            'ORGANIZATION_INVITATION'
        )
    )
    declare type:
        NotificationType;

    @Column(DataType.STRING(255))
    declare title: string;

    @Column(DataType.TEXT)
    declare message: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    declare isRead: boolean;

    @Column(DataType.JSON)
    declare metadata: object | null;
}