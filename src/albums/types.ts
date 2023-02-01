export type UpdateAlbumDto = Partial<
  Pick<IAlbum, 'name' | 'year' | 'artistId'>
> & {
  readonly id: string;
};

export interface IAlbum {
  readonly id: string;
  readonly name: string;
  readonly year: number;
  readonly artistId: string | null;
  update: (args: UpdateAlbumDto) => void;
}

export type CreateAlbumDto = Pick<IAlbum, 'name' | 'year' | 'artistId'> & {
  readonly id?: string;
};
