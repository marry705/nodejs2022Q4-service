import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Store } from 'src/store/store';
import { v4 } from 'uuid';
import { Track, UpdateTrackDto } from './tracks.entitie';

@Injectable()
export class TracksService {
  public getAll(): Track[] {
    return Store.getInstance().tracks;
  }

  public getById(id: string): Track {
    const track = Store.getInstance().tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  public create(createTrackData: UpdateTrackDto): Track {
    const newTrack = new Track({
      ...createTrackData,
      id: v4(),
    });

    Store.getInstance().tracks.push(newTrack);

    return newTrack;
  }

  public update(id: string, updateTrackData: UpdateTrackDto): Track {
    const track = Store.getInstance().tracks.find((track) => track.id == id);

    if (!track) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const trackIndex = Store.getInstance().tracks.findIndex(
      (track) => track.id == id,
    );

    Store.getInstance().tracks.splice(
      trackIndex,
      1,
      new Track(updateTrackData),
    );

    return track;
  }

  public delete(id: string): void {
    const trackIndex = Store.getInstance().tracks.findIndex(
      (track) => track.id == id,
    );

    if (trackIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    Store.getInstance().tracks.splice(trackIndex, 1);
  }
}
