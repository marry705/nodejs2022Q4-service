import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  year: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  artistId: string;
}

export class Album {
  @IsUUID()
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  artistId: string;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
