export type UpdateArtistDto = Partial<Pick<Artist, 'name' | 'grammy'>>;

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }

  public update = ({ name, grammy }: UpdateArtistDto): void => {
    this.name = name;
    this.grammy = grammy;
  };
}
