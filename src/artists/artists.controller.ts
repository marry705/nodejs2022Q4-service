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
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Artist, UpdateArtistDto } from './artists.entitie';
import { ArtistsService } from './artists.service';

@Controller('artist')
@UseGuards(JwtGuard)
export class ArtistsController {
  constructor(private readonly artistsServise: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Artist[]> {
    return await this.artistsServise.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return await this.artistsServise.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  async create(@Body() createArtistDto: UpdateArtistDto): Promise<Artist> {
    return await this.artistsServise.create(createArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.artistsServise.delete(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistData: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistsServise.update(id, updateArtistData);
  }
}
