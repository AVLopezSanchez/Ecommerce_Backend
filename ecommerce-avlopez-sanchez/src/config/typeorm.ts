import { registerAs } from '@nestjs/config';
import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

configDotenv({ path: '../.env' });

const config = {
  type: 'postgres',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  host: 'localhost',
  username: 'postgres',
  password: '4517797isv',
  database: 'practica',
  synchronize: true,
  logging: ['error'],
  dropSchema: false,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  // migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
