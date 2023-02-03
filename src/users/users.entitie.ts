import { Exclude } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
}

export class User {
  @IsUUID()
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
