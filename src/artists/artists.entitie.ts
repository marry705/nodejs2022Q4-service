import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  grammy: boolean;
}

export class Artist {
  @IsUUID()
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
  @ApiProperty()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
