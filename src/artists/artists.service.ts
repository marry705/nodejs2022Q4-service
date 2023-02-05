import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Store } from 'src/store/store';
import { Track } from 'src/tracks/tracks.entitie';
import { v4 } from 'uuid';
import { Artist, UpdateArtistDto } from './artists.entitie';

@Injectable()
export class ArtistsService {
  public getAll(): Artist[] {
    return Store.getInstance().artists;
  }

  public getById(id: string): Artist {
    const artist = Store.getInstance().artists.find(
      (artist) => artist.id === id,
    );

    if (!artist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  public create({ name, grammy }: UpdateArtistDto): Artist {
    const newArtist = new Artist({
      name,
      grammy,
      id: v4(),
    });

    Store.getInstance().artists.push(newArtist);

    return newArtist;
  }

  public update(id: string, updateArtistData: UpdateArtistDto): Artist {
    const artist = Store.getInstance().artists.find(
      (artist) => artist.id == id,
    );

    if (!artist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const artistIndex = Store.getInstance().artists.findIndex(
      (track) => track.id == id,
    );

    const updateArtist = new Artist({ id, ...updateArtistData });

    Store.getInstance().artists.splice(artistIndex, 1, updateArtist);

    return updateArtist;
  }

  public delete(id: string): void {
    const artistIndex = Store.getInstance().artists.findIndex(
      (artist) => artist.id == id,
    );

    if (artistIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const tacks = Store.getInstance().tracks.filter(
      (track) => track.artistId === id,
    );

    for (const track of tacks) {
      track.artistId = null;

      const trackIndex = Store.getInstance().tracks.findIndex(
        (_track) => _track.id == track.id,
      );

      Store.getInstance().tracks.splice(trackIndex, 1, new Track({ ...track }));
    }

    Store.getInstance().artists.splice(artistIndex, 1);
  }
}
