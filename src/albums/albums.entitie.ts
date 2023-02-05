import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string;
}

export class Album {
  @IsUUID()
  id: string;
  name: string;
  year: number;

  @IsOptional()
  @IsString()
  artistId: string;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
