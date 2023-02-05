import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Store } from 'src/store/store';
import { Album } from 'src/albums/albums.entitie';
import { Track } from 'src/tracks/tracks.entitie';
import { Artist } from 'src/artists/artists.entitie';
import { Favorite } from './favorites.entitie';

@Injectable()
export class FavoritesService {
  public getAll(): Favorite {
    return Store.getInstance().favorites;
  }

  public addAlbom(id: string): Album {
    const albom = Store.getInstance().albums.find((album) => album.id == id);

    if (!albom) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    Store.getInstance().favorites.albums.push(albom);

    return albom;
  }

  public addTrack(id: string): Track {
    const track = Store.getInstance().tracks.find((track) => track.id == id);

    if (!track) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    Store.getInstance().favorites.tracks.push(track);

    return track;
  }

  public addArtist(id: string): Artist {
    const artist = Store.getInstance().artists.find(
      (artist) => artist.id == id,
    );

    if (!artist) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    Store.getInstance().favorites.artists.push(artist);

    return artist;
  }

  public deleteTrack(id: string): void {
    const trackIndex = Store.getInstance().favorites.tracks.findIndex(
      (track) => track.id == id,
    );

    if (trackIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    Store.getInstance().favorites.tracks.splice(trackIndex, 1);
  }

  public deleteAlbom(id: string): void {
    const albomIndex = Store.getInstance().favorites.albums.findIndex(
      (album) => album.id == id,
    );

    if (albomIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    Store.getInstance().favorites.albums.splice(albomIndex, 1);
  }

  public deleteArtist(id: string): void {
    const artistIndex = Store.getInstance().favorites.artists.findIndex(
      (artist) => artist.id == id,
    );

    if (artistIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    Store.getInstance().favorites.artists.splice(artistIndex, 1);
  }
}
