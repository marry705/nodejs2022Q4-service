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
  create(@Body() createAlbumDto: UpdateAlbumDto): Album {
    return this.albumServise.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param() id: string, @Body() updateAlbumData: UpdateAlbumDto): Album {
    return this.albumServise.update(id, updateAlbumData);
  }
}
