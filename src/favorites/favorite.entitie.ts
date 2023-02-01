import { IAlbum } from 'src/albums/types';
import { IArtist } from 'src/artists/types';
import { ITrack } from 'src/tracks/types';
import { CreateFavoriteDto, IFavorite } from './types';

export class Favorite implements IFavorite {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];

  constructor(args: CreateFavoriteDto) {
    const { artists = [], albums = [], tracks = [] } = args;
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }
}
