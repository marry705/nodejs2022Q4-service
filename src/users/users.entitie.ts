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

@Entity()
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: string;

  @Column({ nullable: false, default: '' })
  login: string;

  @Column({ nullable: false, default: 1 })
  version: number;

  @Column({ default: Date.now() })
  createdAt: number;

  @Column({ default: Date.now() })
  updatedAt: number;

  @Exclude()
  @Column({ nullable: false, default: '' })
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
