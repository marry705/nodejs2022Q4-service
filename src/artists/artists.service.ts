import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Artist, UpdateArtistDto } from './artists.entitie';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  public async getAll(): Promise<Artist[]> {
    const artists = await this.artistsRepository.find();

    return artists;
  }

  public async getById(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  public async create(artistData: UpdateArtistDto): Promise<Artist> {
    const newArtist = this.artistsRepository.create({
      ...artistData,
      id: v4(),
    });

    return await this.artistsRepository.save(newArtist);
  }

  public async update(
    id: string,
    updateArtistData: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.artistsRepository.update(id, { ...updateArtistData });

    return await this.artistsRepository.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.artistsRepository.delete({ id });
  }
}
