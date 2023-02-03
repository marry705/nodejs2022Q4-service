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
import { Artist, UpdateArtistDto } from './artists.entitie';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsServise: ArtistsService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistsServise.getAll();
  }

  @Get(':id')
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
  update(
    @Param() id: string,
    @Body() updateArtistData: UpdateArtistDto,
  ): Artist {
    return this.artistsServise.update(id, updateArtistData);
  }
}
