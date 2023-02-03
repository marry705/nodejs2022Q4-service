import { Album } from 'src/albums/albums.entitie';
import { Artist } from 'src/artists/artists.entitie';
import { Track } from 'src/tracks/tracks.entitie';

export class Favorite {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(partial: Partial<Favorite>) {
    Object.assign(this, partial);
  }
}
