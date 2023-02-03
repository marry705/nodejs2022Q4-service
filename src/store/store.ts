import { IAlbum } from 'src/albums/types';
import { Artist } from 'src/artists/artists.entitie';
import { IFavorite } from 'src/favorites/types';
import { Track } from 'src/tracks/tracks.entitie';
import { User } from 'src/users/users.entitie';

export class Store {
  private static instance: Store;

  users: User[];
  tracks: Track[];
  artists: Artist[];
  private albums: IAlbum[];
  private favorites: IFavorite;

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
