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
  @Header('Accept', 'application/json')
  create(@Body() createTrackDto: UpdateTrackDto): Track {
    return this.trackServise.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  update(@Param() id: string, @Body() updateTrackData: UpdateTrackDto): Track {
    return this.trackServise.update(id, updateTrackData);
  }
}
