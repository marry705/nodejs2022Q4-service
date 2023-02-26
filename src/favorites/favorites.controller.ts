import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Album } from 'src/albums/albums.entitie';
import { Artist } from 'src/artists/artists.entitie';
import { JWTGuard } from 'src/auth/guards/auth.guard';
import { Track } from 'src/tracks/tracks.entitie';
import { Favorite } from './favorites.entitie';
import { FavoritesService } from './favorites.service';

@Controller('favs')
@UseGuards(JWTGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Favorite> {
    return await this.favoritesService.getAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  async addTrack(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return await this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.favoritesService.deleteTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return await this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.favoritesService.deleteAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  async addArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.favoritesService.deleteArtist(id);
  }
}
