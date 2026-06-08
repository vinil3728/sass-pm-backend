import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
import { sequelize } from './database/sequelize';
import http from 'http';

import {
  initializeSocket
} from './shared/socket/socket.server';

dotenv.config();

const PORT = process.env['PORT'] || 3000;

const httpServer =
  http.createServer(app);

initializeSocket(
  httpServer
);

(async () => {
  try {
    console.log('Connecting to database...', process.env['DB_NAME']);

    await sequelize.authenticate();

    await sequelize.sync({ alter: true });

    console.log('Database Connected');

    httpServer.listen(
      PORT,
      () => {

        console.log(
          `Server running on ${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(error);
  }
})();