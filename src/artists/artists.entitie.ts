import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
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

  @OneToMany(() => Track, (track: Track) => track.artistId, {
    onDelete: 'SET NULL',
  })
  tracks: Track[];

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
