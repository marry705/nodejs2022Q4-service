export type UpdateArtistDto = Partial<Pick<IArtist, 'name' | 'grammy'>> & {
  readonly id: string;
};

export interface IArtist {
  readonly id: string;
  readonly name: string;
  readonly grammy: boolean;
  update: (args: UpdateArtistDto) => void;
}

export type CreateArtistDto = Pick<IArtist, 'name' | 'grammy'> & {
  readonly id?: string;
};
