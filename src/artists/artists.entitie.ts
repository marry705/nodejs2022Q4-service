import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Album } from 'src/albums/albums.entitie';
import { Track } from 'src/tracks/tracks.entitie';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}

@Entity({ name: 'Artists' })
export class Artist {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
