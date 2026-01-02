import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { RBAC_KEY } from './rbac.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const rbac = this.reflector.getAllAndOverride<boolean>(RBAC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rbac) return true;

    // TODO: Implement RBAC logic here
    // const request = context.switchToHttp().getRequest();
    // const user = request['authentication'] as AuthRequest['authentication'];
    return true;
  }
}
