import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME ?? 'wonderland',
  password: process.env.DB_PASSWORD ?? 'admin',
  database: process.env.DB_NAME ?? 'admin',
}));
