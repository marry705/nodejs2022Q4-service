import { Exclude } from 'class-transformer';

export class CreateUserDto {
  login: string;
  password: string;
}

export class UpdateUserDto {
  oldPassword: string;
  newPassword: string;
}

export class User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  public update = ({ newPassword }: UpdateUserDto): void => {
    this.password = newPassword;
    this.version += 1;
    this.updatedAt = Date.now();
  };
}
