import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
// import { Album } from 'src/albums/albums.entitie';
// import { Artist } from 'src/artists/artists.entitie';
// import { Favorite } from 'src/favorites/favorites.entitie';
// import { Track } from 'src/tracks/tracks.entitie';
import { User } from 'src/users/users.entitie';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: env.POSTGRES_HOST as string,
        port: parseInt(env.DB_PORT as string) as number,
        username: env.POSTGRES_USER as string,
        password: env.POSTGRES_PASSWORD as string,
        database: env.POSTGRES_DB as string,
        entities: [User],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
