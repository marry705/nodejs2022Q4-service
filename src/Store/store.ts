import { IAlbum } from 'src/albums/types';
import { IArtist } from 'src/artists/types';
import { IFavorite } from 'src/favorites/types';
import { ITrack } from 'src/tracks/types';
import { User } from 'src/users/users.entitie';

export class Store {
  private static instance: Store;

  users: User[];
  private tracks: ITrack[];
  private artists: IArtist[];
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
