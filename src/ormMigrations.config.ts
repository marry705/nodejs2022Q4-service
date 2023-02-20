import * as dotenv from 'dotenv';
import { env } from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Album } from './albums/albums.entitie';
import { Artist } from './artists/artists.entitie';
import { Favorite } from './favorites/favorites.entitie';
import { Track } from './tracks/tracks.entitie';
import { User } from './users/users.entitie';

dotenv.config();

const configOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: parseInt(env.DB_PORT as string) as number,
  username: env.POSTGRES_USER as string,
  password: env.POSTGRES_PASSWORD as string,
  database: env.POSTGRES_DB as string,
  logging: true,
  entities: [User, Track, Album, Artist, Favorite],
  synchronize: false,
  migrations: [__dirname + '/db/migrations/*.js'],
};

export const dataSource = new DataSource(configOptions);
