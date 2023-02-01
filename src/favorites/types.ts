import { IAlbum } from 'src/albums/types';
import { IArtist } from 'src/artists/types';
import { ITrack } from 'src/tracks/types';

export type CreateFavoriteDto = Partial<
  Pick<IFavorite, 'artists' | 'albums' | 'tracks'>
>;

export interface IFavorite {
  readonly artists: IArtist[];
  readonly albums: IAlbum[];
  readonly tracks: ITrack[];
}
