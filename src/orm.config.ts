import * as dotenv from 'dotenv';
import { env } from 'process';
import { DataSourceOptions } from 'typeorm';
import { User } from './users/users.entitie';

dotenv.config();

export const ormConfig = {
  type: 'postgres',
  host: env.POSTGRES_HOST as string,
  port: parseInt(env.DB_PORT as string) as number,
  username: env.POSTGRES_USER as string,
  password: env.POSTGRES_PASSWORD as string,
  database: env.POSTGRES_DB as string,
  entities: [User],
  synchronize: true,
  logging: true,
  // migrationsRun: true,
  // migrations: [],
} as DataSourceOptions;
