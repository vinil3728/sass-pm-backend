import { Response } from 'express';

import { NotificationService }
    from '../services/notification.service';

import { AuthenticatedRequest }
    from '../../../shared/types/authenticated-request';

export class NotificationController {

    private readonly notificationService =
        new NotificationService();

    getNotifications = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const notifications =
            await this.notificationService
                .getNotifications(
                    req.user!.userId
                );

        return res.status(200)
            .json({
                success: true,
                data: notifications,
            });
    };

    getUnreadCount = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.notificationService
                .getUnreadCount(
                    req.user!.userId
                );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };

    markRead = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.notificationService
                .markRead(
                    req.params.id as string
                );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };

    markAllRead = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {

        const result =
            await this.notificationService
                .markAllRead(
                    req.user!.userId
                );

        return res.status(200)
            .json({
                success: true,
                data: result,
            });
    };
}