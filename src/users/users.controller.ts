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
  ClassSerializerInterceptor,
  UseInterceptors,
  Header,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from './users.entitie';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  getOne(@Param('id') id: string): User {
    return this.usersService.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Accept', 'application/json')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Accept', 'application/json')
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Accept', 'application/json')
  update(@Param() id: string, @Body() updateUserData: UpdateUserDto): User {
    return this.usersService.update(id, updateUserData);
  }
}
