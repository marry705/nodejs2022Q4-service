import { Album } from 'src/albums/albums.entitie';
import { Artist } from 'src/artists/artists.entitie';
import { Track } from 'src/tracks/tracks.entitie';

export class Favorite {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor() {
    this.tracks = [];
    this.artists = [];
    this.albums = [];
  }
}
