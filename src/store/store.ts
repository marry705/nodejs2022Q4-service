import { Album } from 'src/albums/albums.entitie';
import { Artist } from 'src/artists/artists.entitie';
import { Favorite } from 'src/favorites/favorites.entitie';
import { Track } from 'src/tracks/tracks.entitie';
import { User } from 'src/users/users.entitie';

export class Store {
  private static instance: Store;

  users: User[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  favorites: Favorite;

  private constructor() {
    this.users = [];
    this.tracks = [];
    this.artists = [];
    this.albums = [];
    this.favorites = {
      tracks: this.tracks,
      artists: this.artists,
      albums: this.albums,
    };
  }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }

    return Store.instance;
  }
}
