export type UpdateTrackDto = Partial<
  Pick<ITrack, 'name' | 'artistId' | 'albumId' | 'duration'>
> & {
  readonly id: string;
};

export interface ITrack {
  readonly id: string;
  readonly name: string;
  readonly artistId: string | null;
  readonly albumId: string | null;
  readonly duration: number;
  update: (args: UpdateTrackDto) => void;
}

export type CreateTrackDto = Pick<
  ITrack,
  'name' | 'artistId' | 'albumId' | 'duration'
> & {
  readonly id?: string;
};
