import {
  Controller,
  Get,
  Put,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Header,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album, UpdateAlbumDto } from './albums.entitie';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumServise: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  getAll(): Album[] {
    return this.albumServise.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Album {
    return this.albumServise.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Accept', 'application/json')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumServise.delete(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  create(@Body() createAlbumDto: UpdateAlbumDto): Album {
    return this.albumServise.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumData: UpdateAlbumDto,
  ): Album {
    return this.albumServise.update(id, updateAlbumData);
  }
}
