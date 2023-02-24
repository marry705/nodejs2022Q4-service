import { IsJWT, IsNotEmpty } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}

export class JWTTokens {
  @IsNotEmpty()
  @IsJWT()
  accessToken: string;

  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
