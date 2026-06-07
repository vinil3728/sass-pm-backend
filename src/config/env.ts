import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env['PORT']!,

  DB_HOST: process.env['DB_HOST']!,
  DB_PORT: Number(
    process.env['DB_PORT']!
  ),

  DB_NAME: process.env['DB_NAME']!,
  DB_USER: process.env['DB_USER']!,
  DB_PASSWORD: process.env['DB_PASSWORD']!,

  JWT_ACCESS_SECRET:
    process.env['JWT_ACCESS_SECRET']!,

  JWT_REFRESH_SECRET:
    process.env['JWT_REFRESH_SECRET']!,
};