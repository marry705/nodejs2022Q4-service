import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from 'src/albums/albums.entitie';
import { Track } from 'src/tracks/tracks.entitie';
import { Artist } from 'src/artists/artists.entitie';
import { Favorite } from './favorites.entitie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  public async getAll(): Promise<Favorite> {
    const favorites = await this.favoritesRepository.find()[0];

    // if (!favorites.length) {
    //   favorites = this.favoritesRepository.create({
    //     artists: [],
    //     albums: [],
    //     tracks: [],
    //   });
    // }

    return favorites;
  }

  public async addAlbum(id: string): Promise<Album> {
    const favorites = await this.getAll();
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isAlbum = favorites.albums.includes(album);

    if (!isAlbum) {
      favorites.albums.push(album);
    }

    await this.favoritesRepository.save(favorites);

    return album;
  }

  public async addTrack(id: string): Promise<Track> {
    const favorites = await this.getAll();
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isTrack = favorites.tracks.includes(track);

    if (!isTrack) {
      favorites.tracks.push(track);
    }

    await this.favoritesRepository.save(favorites);

    return track;
  }

  public async addArtist(id: string): Promise<Artist> {
    const favorites = await this.getAll();
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isArtist = favorites.artists.includes(artist);

    if (!isArtist) {
      favorites.artists.push(artist);
    }

    await this.favoritesRepository.save(favorites);

    return artist;
  }

  public async deleteTrack(id: string): Promise<void> {
    const favorites = await this.getAll();
    const trackIndex = favorites.tracks.findIndex((track) => track.id == id);

    if (trackIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    favorites.tracks.splice(trackIndex, 1);

    await this.favoritesRepository.save(favorites);
  }

  public async deleteAlbum(id: string): Promise<void> {
    const favorites = await this.getAll();
    const albomIndex = favorites.albums.findIndex((album) => album.id == id);

    if (albomIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    favorites.albums.splice(albomIndex, 1);

    await this.favoritesRepository.save(favorites);
  }

  public async deleteArtist(id: string): Promise<void> {
    const favorites = await this.getAll();
    const artistIndex = favorites.artists.findIndex(
      (artist) => artist.id == id,
    );

    if (artistIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    favorites.artists.splice(artistIndex, 1);

    await this.favoritesRepository.save(favorites);
  }
}
