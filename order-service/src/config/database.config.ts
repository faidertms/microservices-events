import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  type: process.env.DB_TYPE || 'postgresql',
  password: process.env.DB_PASSWORD || 'postgres',
  debug: process.env.NODE_ENV !== 'production',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    disableForeignKeys: false,
    allOrNothing: true,
  },
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
}));
