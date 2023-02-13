import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Album } from 'src/albums/albums.entitie';
import { Artist } from 'src/artists/artists.entitie';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity({ name: 'Tracks' })
export class Track {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  duration: number;

  @IsOptional()
  @Column({ nullable: true })
  artistId: string;

  @IsOptional()
  @Column({ nullable: true })
  albumId: string;

  @ManyToOne(() => Album, (album: Album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  album: Album[];

  @ManyToOne(() => Artist, (artist: Artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  artist: Artist[];

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
