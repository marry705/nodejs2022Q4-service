export type UpdatePasswordDto = {
  oldPassword: string;
  newPassword: string;
};

export interface IUser {
  readonly id: string;
  readonly login: string;
  readonly password: string;
  readonly version: number;
  readonly createdAt: number;
  readonly updatedAt: number;
  update: (args: UpdatePasswordDto) => void;
}

export type CreateUserDto = Pick<IUser, 'login' | 'password'> & {
  readonly id?: string;
};
