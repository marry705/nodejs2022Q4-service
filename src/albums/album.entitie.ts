import { v4 } from 'uuid';
import { IAlbum, CreateAlbumDto, UpdateAlbumDto } from './types';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string;

  constructor(args: CreateAlbumDto) {
    const { id = v4(), name, year, artistId } = args;
    this.id = id;
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  public update = ({ name, year, artistId }: UpdateAlbumDto): void => {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  };
}
