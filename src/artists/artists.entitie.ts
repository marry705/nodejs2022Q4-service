import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}

export class Artist {
  @IsUUID()
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }

  public update = ({ name, grammy }: UpdateArtistDto): void => {
    this.name = name;
    this.grammy = grammy;
  };
}
