import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, CreateUserDto } from '../users/users.entitie';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JWTTokens, TokenDto } from './auth.entitie';
import { env } from 'process';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async generateJWTTokens({
    id,
    login,
  }: Pick<User, 'id' | 'login'>): Promise<JWTTokens> {
    const accessToken = await this.jwtService.signAsync(
      { id, login },
      { expiresIn: env.TOKEN_EXPIRE_TIME },
    );

    const refreshToken = await this.jwtService.signAsync(
      { id, login },
      { expiresIn: env.TOKEN_REFRESH_EXPIRE_TIME },
    );

    return { accessToken, refreshToken };
  }

  public async signup(createAuthDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createAuthDto);
  }

  public async login(loginAuthData: CreateUserDto): Promise<JWTTokens> {
    const users = await this.usersRepository.find({
      where: {
        login: loginAuthData.login,
      },
    });

    const targetUser = await Promise.all(
      users.filter(async (user) => {
        const isMatchPassword = await compare(
          loginAuthData.password,
          user.password,
        );

        if (isMatchPassword) {
          return user;
        }
      }),
    );

    if (!targetUser[0]) {
      throw new HttpException('NOT_FOUND', HttpStatus.FORBIDDEN);
    }

    return await this.generateJWTTokens(targetUser[0]);
  }

  public async refresh(userTokenDto: TokenDto): Promise<JWTTokens> {
    const user = await this.jwtService.verifyAsync<User>(
      userTokenDto.refreshToken,
    );

    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.FORBIDDEN);
    }

    return await this.generateJWTTokens({ id: user.id, login: user.login });
  }
}
