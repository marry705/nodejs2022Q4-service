import { IAlbum } from 'src/albums/types';
import { Artist } from 'src/artists/artists.entitie';
import { IFavorite } from 'src/favorites/types';
import { ITrack } from 'src/tracks/types';
import { User } from 'src/users/users.entitie';

export class Store {
  private static instance: Store;

  users: User[];
  private tracks: ITrack[];
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
