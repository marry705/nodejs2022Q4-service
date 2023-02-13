import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}

@Entity({ name: 'Users' })
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  login: string;

  @Column({ default: 1 })
  version: number;

  @Column({ default: Math.floor(Date.now() / 1000) })
  createdAt: number;

  @Column({ default: Math.floor(Date.now() / 1000) })
  updatedAt: number;

  @Exclude()
  @Column({ nullable: false })
  password: string;
}
