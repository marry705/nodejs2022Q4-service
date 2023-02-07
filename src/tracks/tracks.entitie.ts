import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  duration: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  artistId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  albumId: string;
}

export class Track {
  @IsUUID()
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
  @ApiProperty()
  duration: number;

  @IsOptional()
  @ApiProperty()
  artistId: string;

  @IsOptional()
  @ApiProperty()
  albumId: string;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
