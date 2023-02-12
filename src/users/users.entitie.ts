import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
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

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
