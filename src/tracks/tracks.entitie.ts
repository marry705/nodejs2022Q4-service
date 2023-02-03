import { IsOptional } from 'class-validator';

export type UpdateTrackDto = Partial<Pick<Track, 'artistId' | 'albumId'>> &
  Pick<Track, 'name' | 'duration'>;

export class Track {
  id: string;
  name: string;
  duration: number;
  @IsOptional()
  artistId: string;
  @IsOptional()
  albumId: string;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
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
