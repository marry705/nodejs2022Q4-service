import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { DataSourceOptions } from 'typeorm';
import { Album } from './albums/albums.entitie';
import { AlbumsModule } from './albums/albums.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Artist } from './artists/artists.entitie';
import { ArtistsModule } from './artists/artists.module';
import { Favorite } from './favorites/favorites.entitie';
import { FavoritesModule } from './favorites/favorites.module';
import { Track } from './tracks/tracks.entitie';
import { TracksModule } from './tracks/tracks.module';
import { User } from './users/users.entitie';
import { UsersModule } from './users/users.module';

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: env.POSTGRES_HOST ?? 'postgres',
  username: env.POSTGRES_USER ?? 'user',
  password: env.POSTGRES_PASSWORD ?? 'password',
  database: env.POSTGRES_DB ?? 'postgres',
  entities: [User, Track, Album, Artist, Favorite],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: false,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class AppModule {}
