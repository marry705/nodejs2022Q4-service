import { v4 } from 'uuid';
import { UpdateArtistDto, IArtist, CreateArtistDto } from './types';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(args: CreateArtistDto) {
    const { id = v4(), name, grammy } = args;
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }

  public update = ({ name, grammy }: UpdateArtistDto): void => {
    this.name = name;
    this.grammy = grammy;
  };
}
