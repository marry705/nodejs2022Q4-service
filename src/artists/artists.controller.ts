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
import { Artist, UpdateArtistDto } from './artists.entitie';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsServise: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Artist[] {
    return this.artistsServise.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Artist {
    return this.artistsServise.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.artistsServise.delete(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: UpdateArtistDto): Artist {
    return this.artistsServise.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param() id: string,
    @Body() updateArtistData: UpdateArtistDto,
  ): Artist {
    return this.artistsServise.update(id, updateArtistData);
  }
}
