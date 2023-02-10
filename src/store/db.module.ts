import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
// import { Album } from 'src/albums/albums.entitie';
// import { Artist } from 'src/artists/artists.entitie';
// import { Favorite } from 'src/favorites/favorites.entitie';
// import { Track } from 'src/tracks/tracks.entitie';
import { User } from 'src/users/users.entitie';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        // host is name of container
        host: 'db',
        port: parseInt(env.DB_PORT) ?? 5432,
        username: env.POSTGRES_USER ?? 'admin',
        password: env.POSTGRES_PASSWORD ?? 'admin',
        database: env.POSTGRES_DB ?? 'postgres',
        entities: [User],
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
