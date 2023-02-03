import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;
  @IsNumber()
  duration: number;
  @IsOptional()
  @IsString()
  artistId: string;
  @IsOptional()
  @IsString()
  albumId: string;
}

export class Track {
  @IsUUID()
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
