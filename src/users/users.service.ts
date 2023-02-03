import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Store } from 'src/store/store';
import { v4, validate } from 'uuid';
import { CreateUserDto, UpdateUserDto, User } from './users.entitie';

@Injectable()
export class UsersService {
  public getAll(): User[] {
    return Store.getInstance().users.map((user) => new User(user));
  }

  public getById(id: string): User {
    if (!validate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const user = Store.getInstance().users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  public create({ login, password }: CreateUserDto): User {
    const newUser = new User({
      login,
      password,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    Store.getInstance().users.push(newUser);

    return newUser;
  }

  public update(id: string, { oldPassword, newPassword }: UpdateUserDto): User {
    if (!validate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const user = Store.getInstance().users.find((user) => user.id == id);

    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    user.update({ oldPassword, newPassword });

    return user;
  }

  public delete(id: string) {
    if (!validate(id)) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    const userIndex = Store.getInstance().users.findIndex(
      (user) => user.id == id,
    );

    if (userIndex === -1) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    Store.getInstance().users.splice(userIndex, 1);

    return new HttpException('Deleted', HttpStatus.NO_CONTENT);
  }
}
