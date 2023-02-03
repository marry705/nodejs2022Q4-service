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
import { Track, UpdateTrackDto } from './tracks.entitie';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly trackServise: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Track[] {
    return this.trackServise.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Track {
    return this.trackServise.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.trackServise.delete(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtistDto: UpdateTrackDto): Track {
    return this.trackServise.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param() id: string, @Body() updateArtistData: UpdateTrackDto): Track {
    return this.trackServise.update(id, updateArtistData);
  }
}
