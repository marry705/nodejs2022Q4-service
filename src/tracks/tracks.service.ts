import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Track, UpdateTrackDto } from './tracks.entitie';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  public async getAll(): Promise<Track[]> {
    const tracks = await this.tracksRepository.find();

    return tracks;
  }

  public async getById(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  public async create(createTrackData: UpdateTrackDto): Promise<Track> {
    const newTrack = await this.tracksRepository.create({
      ...createTrackData,
      id: v4(),
    });

    return await this.tracksRepository.save(newTrack);
  }

  public async update(
    id: string,
    updateTrackData: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.tracksRepository.update(id, { ...updateTrackData });

    return await this.tracksRepository.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.tracksRepository.delete({ id });
  }
}
