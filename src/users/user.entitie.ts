import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import { CreateUserDto, IUser, UpdatePasswordDto } from './types';

export class User implements IUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(args: CreateUserDto) {
    const { id = v4(), login, password } = args;
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  public update = ({ oldPassword, newPassword }: UpdatePasswordDto): void => {
    if (oldPassword !== this.password) {
      throw new Error('');
    }

    this.password = newPassword;
    this.updatedAt = Date.now();
    this.version += 1;
  };
}
