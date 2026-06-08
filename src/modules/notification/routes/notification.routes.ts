import { Router }
  from 'express';

import { NotificationController }
  from '../controllers/notification.controller';

import { authMiddleware }
  from '../../../shared/middleware/auth.middleware';

const router = Router();

const controller =
  new NotificationController();

router.get(
  '/notifications',

  authMiddleware,

  controller.getNotifications
);

router.get(
  '/notifications/unread-count',

  authMiddleware,

  controller.getUnreadCount
);

router.patch(
  '/notifications/:id/read',

  authMiddleware,

  controller.markRead
);

router.patch(
  '/notifications/read-all',

  authMiddleware,

  controller.markAllRead
);

export default router;