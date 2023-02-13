import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Track } from 'src/tracks/tracks.entitie';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity({ name: 'Albums' })
export class Album {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  year: number;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  artistId: string;

  @OneToMany(() => Track, (track: Track) => track.albumId, {
    onDelete: 'SET NULL',
  })
  tracks: Track[];

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
