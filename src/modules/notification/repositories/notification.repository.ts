import { Notification }
    from '../models/notification.model';

export class NotificationRepository {

    async create(
        data: Partial<Notification>
    ) {

        return Notification.create(
            data as any
        );
    }

    async findByUser(
        userId: string,
        page?: number,
        limit?: number
    ) {

        return Notification.findAll({

            where: {
                userId,
            },

            order: [
                ['createdAt', 'DESC']
            ],
        });
    }

    async unreadCount(
        userId: string
    ) {

        return Notification.count({

            where: {
                userId,
                isRead: false,
            },
        });
    }

    async markRead(
        notificationId: string
    ) {

        await Notification.update(
            {
                isRead: true,
            },
            {
                where: {
                    id: notificationId,
                },
            }
        );
    }

    async markAllRead(
        userId: string
    ) {

        await Notification.update(
            {
                isRead: true,
            },
            {
                where: {
                    userId,
                    isRead: false,
                },
            }
        );
    }
}