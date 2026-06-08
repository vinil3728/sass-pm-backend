import { NotificationRepository }
    from '../repositories/notification.repository';

import { NotificationType }
    from '../enums/notification-type.enum';

import {
    NotificationRealtimeService
} from './notification-realtime.service';

export class NotificationService {

    private readonly repository =
        new NotificationRepository();

    private readonly realtime =
        new NotificationRealtimeService();

    async createNotification(
        userId: string,
        type: NotificationType,
        title: string,
        message: string,
        metadata?: object
    ) {

        const notification =
            await this.repository.create({
                userId,
                type,
                title,
                message,
                metadata,
            });

        this.realtime.sendToUser(
            userId,
            notification
        );

        return notification;
    }

    async getNotifications(
        userId: string,
        page?: number,
        limit?: number
    ) {

        return this.repository.findByUser(
            userId
        );
    }

    async getUnreadCount(
        userId: string
    ) {

        const count =
            await this.repository
                .unreadCount(
                    userId
                );

        return {
            count,
        };
    }

    async markRead(
        notificationId: string
    ) {

        await this.repository
            .markRead(
                notificationId
            );

        return {
            success: true,
        };
    }

    async markAllRead(
        userId: string
    ) {

        await this.repository
            .markAllRead(
                userId
            );

        return {
            success: true,
        };
    }
}