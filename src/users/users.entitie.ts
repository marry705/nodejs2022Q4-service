import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ default: 'Marry' })
  login: string;
  @IsString()
  @ApiProperty({ default: 'qwerty' })
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ default: 'qwerty' })
  oldPassword: string;
  @IsString()
  @ApiProperty({ default: 'qwerty1234' })
  newPassword: string;
}

export class User {
  @ApiProperty()
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
}
