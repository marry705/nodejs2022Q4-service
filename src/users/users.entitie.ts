import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly newPassword: string;
}

export class User {
  @IsUUID()
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  version: number;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  updatedAt: number;

  @Exclude()
  @ApiProperty()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
