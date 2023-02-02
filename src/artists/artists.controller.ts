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
  constructor(private readonly artistServise: ArtistsService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistServise.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Artist {
    return this.artistServise.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.artistServise.delete(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createArtistDto: UpdateArtistDto): Artist {
    return this.artistServise.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param() id: string,
    @Body() updateArtistData: UpdateArtistDto,
  ): Artist {
    return this.artistServise.update(id, updateArtistData);
  }
}
