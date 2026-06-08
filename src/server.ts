import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
import { sequelize } from './database/sequelize';

dotenv.config();

const PORT = process.env['PORT'] || 3000;

(async () => {
  try {
    console.log('Connecting to database...', process.env['DB_NAME']);

    await sequelize.authenticate();

    // await sequelize.sync({ alter: true });

    console.log('Database Connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();