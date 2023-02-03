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
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album, UpdateAlbumDto } from './albums.entitie';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumServise: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Album[] {
    return this.albumServise.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Album {
    return this.albumServise.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
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
  update(@Param() id: string, @Body() updateAlbumData: UpdateAlbumDto): Album {
    return this.albumServise.update(id, updateAlbumData);
  }
}
