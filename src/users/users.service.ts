import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { compare, hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto, User } from './users.entitie';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async getAll(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }

  public async getById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  public async create(userData: CreateUserDto): Promise<User> {
    userData.password = await hash(
      userData.password,
      parseInt(process.env.CRYPT_SALT) ?? 10,
    );

    const newUser = await this.usersRepository.create({
      ...userData,
      id: v4(),
    });

    return await this.usersRepository.save(newUser);
  }

  public async update(
    id: string,
    updateUserData: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const isMatchPassword = await compare(
      updateUserData.oldPassword,
      user.password,
    );

    if (!isMatchPassword) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    updateUserData.newPassword = await hash(
      updateUserData.newPassword,
      parseInt(process.env.CRYPT_SALT) ?? 10,
    );

    await this.usersRepository.update(id, {
      password: updateUserData.newPassword,
      version: user.version + 1,
      updatedAt: Math.floor(Date.now() / 1000),
    });

    return await this.usersRepository.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.delete({ id });
  }
}
