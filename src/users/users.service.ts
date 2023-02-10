import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateUserDto, UpdateUserDto, User } from './users.entitie';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  public async create({ login, password }: CreateUserDto): Promise<User> {
    const newUser = new User({
      login,
      password,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await this.usersRepository.save(newUser);

    return newUser;
  }

  public async update(
    id: string,
    updateUserData: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updateUserData.oldPassword) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    await this.usersRepository.update(id, {
      password: updateUserData.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
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
