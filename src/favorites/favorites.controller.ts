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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Favorite } from './favorites.entitie';
import { FavoritesService } from './favorites.service';

@Controller('favs')
@ApiTags('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Favorite {
    return this.favoritesService.getAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  addAlbom(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addAlbom(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbom(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteAlbom(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
