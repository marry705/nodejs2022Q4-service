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
  async getAll(): Promise<Album[]> {
    return await this.albumServise.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return await this.albumServise.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Accept', 'application/json')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.albumServise.delete(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  async create(@Body() createAlbumDto: UpdateAlbumDto): Promise<Album> {
    return await this.albumServise.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumData: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumServise.update(id, updateAlbumData);
  }
}
