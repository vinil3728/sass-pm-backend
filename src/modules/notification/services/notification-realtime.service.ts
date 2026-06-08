import {
    getIO
} from '../../../shared/socket/socket.server';

export class NotificationRealtimeService {

    sendToUser(
        userId: string,
        payload: any
    ) {

        getIO()
            .to(
                `user:${userId}`
            )
            .emit(
                'notification',
                payload
            );
    }
}