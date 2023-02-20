import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { Album } from 'src/albums/albums.entitie';
import { Artist } from 'src/artists/artists.entitie';
import { Track } from 'src/tracks/tracks.entitie';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Favotites' })
export class Favorite {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @JoinTable()
  @ManyToMany(() => Artist, { onDelete: 'CASCADE', eager: true })
  artists: Artist[];

  @JoinTable()
  @ManyToMany(() => Album, { onDelete: 'CASCADE', eager: true })
  albums: Album[];

  @JoinTable()
  @ManyToMany(() => Track, { onDelete: 'CASCADE', eager: true })
  tracks: Track[];
}
