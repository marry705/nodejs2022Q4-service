import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JWTGuard implements AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();

    if (!req.user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
function AuthGuard(arg0: string) {
  throw new Error('Function not implemented.');
}

