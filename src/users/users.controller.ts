import {
  Controller,
  Get,
  Put,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from './users.entitie';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): User {
    return this.usersService.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param() id: string, @Body() updateUserData: UpdateUserDto): User {
    return this.usersService.update(id, updateUserData);
  }
}
