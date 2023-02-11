import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
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
}
