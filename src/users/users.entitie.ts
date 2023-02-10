import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(3)
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(5)
  readonly password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(5)
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MinLength(5)
  readonly newPassword: string;
}

@Entity()
export class User {
  @IsUUID()
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: string;

  @ApiProperty()
  @Column({ nullable: false, default: '' })
  login: string;

  @ApiProperty()
  @Column({ nullable: false, default: 1 })
  version: number;

  @ApiProperty()
  @Column({ default: Date.now() })
  createdAt: number;

  @ApiProperty()
  @Column({ default: Date.now() })
  updatedAt: number;

  @Exclude()
  @ApiProperty()
  @Column({ nullable: false, default: '' })
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
