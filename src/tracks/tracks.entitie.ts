import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Album } from 'src/albums/albums.entitie';
import { Artist } from 'src/artists/artists.entitie';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
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

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @IsOptional()
  @Column({ nullable: true })
  albumId: string;

  @ManyToOne(() => Album, (album: Album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: Album[];
}
