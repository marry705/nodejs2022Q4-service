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
import { ApiTags } from '@nestjs/swagger';
import { Artist, UpdateArtistDto } from './artists.entitie';
import { ArtistsService } from './artists.service';

@Controller('artist')
@ApiTags('artist')
export class ArtistsController {
  constructor(private readonly artistsServise: ArtistsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Artist[] {
    return this.artistsServise.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Artist {
    return this.artistsServise.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsServise.delete(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  create(@Body() createArtistDto: UpdateArtistDto): Artist {
    return this.artistsServise.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistData: UpdateArtistDto,
  ): Artist {
    return this.artistsServise.update(id, updateArtistData);
  }
}
