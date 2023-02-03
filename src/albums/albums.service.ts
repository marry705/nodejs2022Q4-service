import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Store } from 'src/store/store';
import { v4, validate } from 'uuid';
import { Album, UpdateAlbumDto } from './albums.entitie';

@Injectable()
export class AlbumsService {
  public getAll(): Album[] {
    return Store.getInstance().albums;
  }

  public getById(id: string): Album {
    if (!validate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

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
    if (!validate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const album = Store.getInstance().albums.find((album) => album.id == id);

    if (!album) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    album.update(updateAlbumData);

    return album;
  }

  public delete(id: string) {
    if (!validate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const albumIndex = Store.getInstance().albums.findIndex(
      (album) => album.id == id,
    );

    if (albumIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    Store.getInstance().albums.splice(albumIndex, 1);

    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }
}
