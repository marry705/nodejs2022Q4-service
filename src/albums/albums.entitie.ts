import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name: string;
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

  public update = ({ name, year, artistId }: UpdateAlbumDto): void => {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  };
}
