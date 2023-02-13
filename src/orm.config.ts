import * as dotenv from 'dotenv';
import { env } from 'process';
import { DataSourceOptions } from 'typeorm';
import { Album } from './albums/albums.entitie';
import { Artist } from './artists/artists.entitie';
import { Favorite } from './favorites/favorites.entitie';
import { Track } from './tracks/tracks.entitie';
import { User } from './users/users.entitie';

dotenv.config();

export const ormConfig = {
  type: 'postgres',
  host: env.POSTGRES_HOST as string,
  port: parseInt(env.DB_PORT as string) as number,
  username: env.POSTGRES_USER as string,
  password: env.POSTGRES_PASSWORD as string,
  database: env.POSTGRES_DB as string,
  entities: [User, Album, Artist, Track, Favorite],
  migrations: ['migrations/**/*{.ts,.js}'],
  synchronize: true,
  logging: true,
} as DataSourceOptions;
