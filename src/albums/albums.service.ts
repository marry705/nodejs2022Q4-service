import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { removeFromFavoritesByKey } from 'src/favorites/helper';
import { Store } from 'src/store/store';
import { Track } from 'src/tracks/tracks.entitie';
import { v4 } from 'uuid';
import { Album, UpdateAlbumDto } from './albums.entitie';

@Injectable()
export class AlbumsService {
  public getAll(): Album[] {
    return Store.getInstance().albums;
  }

  public getById(id: string): Album {
    const album = Store.getInstance().albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  public create(createAlbumData: UpdateAlbumDto): Album {
    const newAlbum = new Album({
      ...createAlbumData,
      id: v4(),
    });

    Store.getInstance().albums.push(newAlbum);

    return newAlbum;
  }

  public update(id: string, updateAlbumData: UpdateAlbumDto): Album {
    const albumIndex = Store.getInstance().albums.findIndex(
      (album) => album.id == id,
    );

    if (albumIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updateAlbum = new Album({ id, ...updateAlbumData });

    Store.getInstance().albums.splice(albumIndex, 1, updateAlbum);

    return updateAlbum;
  }

  public delete(id: string): void {
    const albumIndex = Store.getInstance().albums.findIndex(
      (album) => album.id == id,
    );

    if (albumIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const tacks = Store.getInstance().tracks.filter(
      (track) => track.albumId === id,
    );

    for (const track of tacks) {
      track.albumId = null;

      const trackIndex = Store.getInstance().tracks.findIndex(
        (_track) => _track.id == track.id,
      );

      Store.getInstance().tracks.splice(trackIndex, 1, new Track({ ...track }));
    }

    removeFromFavoritesByKey(id, 'albums');

    Store.getInstance().albums.splice(albumIndex, 1);
  }
}
