import { IsJWT } from 'class-validator';

export class TokenDto {
  @IsJWT()
  refreshToken: string;
}

export class JWTTokens {
  @IsJWT()
  accessToken: string;

  @IsJWT()
  refreshToken: string;
}
