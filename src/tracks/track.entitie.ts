import { v4 } from 'uuid';
import { ITrack, CreateTrackDto, UpdateTrackDto } from './types';

export class Track implements ITrack {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;

  constructor(args: CreateTrackDto) {
    const { id = v4(), name, artistId, albumId, duration } = args;
    this.id = id;
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  public update = ({
    name,
    artistId,
    albumId,
    duration,
  }: UpdateTrackDto): void => {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  };
}
