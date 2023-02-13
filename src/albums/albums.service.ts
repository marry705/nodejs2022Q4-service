import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Album, UpdateAlbumDto } from './albums.entitie';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  public async getAll(): Promise<Album[]> {
    const albums = await this.albumsRepository.find();

    return albums;
  }

  public async getById(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  public async create(createAlbumData: UpdateAlbumDto): Promise<Album> {
    const newAlbum = this.albumsRepository.create({
      ...createAlbumData,
      id: v4(),
    });

    return await this.albumsRepository.save(newAlbum);
  }

  public async update(
    id: string,
    updateAlbumData: UpdateAlbumDto,
  ): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.albumsRepository.update(id, { ...updateAlbumData });

    return await this.albumsRepository.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.albumsRepository.delete({ id });
  }
}
