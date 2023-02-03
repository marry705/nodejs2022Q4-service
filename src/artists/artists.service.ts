import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Store } from 'src/store/store';
import { v4, validate } from 'uuid';
import { Artist, UpdateArtistDto } from './artists.entitie';

@Injectable()
export class ArtistsService {
  public getAll(): Artist[] {
    return Store.getInstance().artists.map((artist) => new Artist(artist));
  }

  public getById(id: string): Artist {
    if (!validate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

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

  public update(id: string, { name, grammy }: UpdateArtistDto): Artist {
    if (!validate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const artist = Store.getInstance().artists.find(
      (artist) => artist.id == id,
    );

    if (!artist) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    artist.update({ name, grammy });

    return artist;
  }

  public delete(id: string) {
    if (!validate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const artistIndex = Store.getInstance().artists.findIndex(
      (artist) => artist.id == id,
    );

    if (artistIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    Store.getInstance().artists.splice(artistIndex, 1);

    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }
}
