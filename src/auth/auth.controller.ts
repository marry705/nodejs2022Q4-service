import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto, User } from '../users/users.entitie';
import { JWTTokens, TokenDto } from './auth.entitie';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  async signup(@Body() createAuthData: CreateUserDto): Promise<User> {
    return await this.authService.signup(createAuthData);
  }

  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Body() loginAuthData: CreateUserDto): Promise<JWTTokens> {
    return await this.authService.login(loginAuthData);
  }

  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Body() userTokenData: TokenDto): Promise<JWTTokens> {
    return await this.authService.refresh(userTokenData);
  }
}
