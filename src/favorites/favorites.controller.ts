import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post('/track/:id')
  @Header('Accept', 'application/json')
  addTrack(@Param('id') id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('/album/:id')
  @Header('Accept', 'application/json')
  addAlbom(@Param('id') id: string) {
    return this.favoritesService.addAlbom(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbom(@Param('id') id: string) {
    return this.favoritesService.deleteAlbom(id);
  }

  @Post('/artist/:id')
  @Header('Accept', 'application/json')
  addArtist(@Param('id') id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
