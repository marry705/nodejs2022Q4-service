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
import { JWTGuard } from 'src/auth/guards/auth.guard';
import { Track, UpdateTrackDto } from './tracks.entitie';
import { TracksService } from './tracks.service';

@Controller('track')
@UseGuards(JWTGuard)
export class TracksController {
  constructor(private readonly trackServise: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  async getAll(): Promise<Track[]> {
    return await this.trackServise.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    return await this.trackServise.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Accept', 'application/json')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.trackServise.delete(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  async create(@Body() createTrackDto: UpdateTrackDto): Promise<Track> {
    return await this.trackServise.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackData: UpdateTrackDto,
  ): Promise<Track> {
    return await this.trackServise.update(id, updateTrackData);
  }
}
