import { Server } from 'socket.io';

let io: Server;

export const initializeSocket = (
    httpServer: any
) => {

    io = new Server(
        httpServer,
        {
            cors: {
                origin: '*',
            },
        }
    );

    io.on(
        'connection',
        socket => {

            console.log(
                `Socket Connected: ${socket.id}`
            );

            socket.on(
                'join-user-room',
                (userId: string) => {

                    socket.join(
                        `user:${userId}`
                    );
                }
            );

            socket.on(
                'disconnect',
                () => {

                    console.log(
                        `Socket Disconnected: ${socket.id}`
                    );
                }
            );
        }
    );

    return io;
};

export const getIO = () => {

    if (!io) {

        throw new Error(
            'Socket not initialized'
        );
    }

    return io;
};