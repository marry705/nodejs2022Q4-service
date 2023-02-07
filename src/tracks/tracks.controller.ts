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
import { Track, UpdateTrackDto } from './tracks.entitie';
import { TracksService } from './tracks.service';

@Controller('track')
@ApiTags('track')
export class TracksController {
  constructor(private readonly trackServise: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  getAll(): Track[] {
    return this.trackServise.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Track {
    return this.trackServise.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Accept', 'application/json')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
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
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackData: UpdateTrackDto,
  ): Track {
    return this.trackServise.update(id, updateTrackData);
  }
}
