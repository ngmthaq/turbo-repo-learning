import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

import { ConfigType } from '../../core/config/config-type';
import { ExceptionBuilder } from '../../core/exception/exception-builder';
import { ExceptionDict } from '../../core/exception/exception-dict';

import { JwtPayload } from './auth-type';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw ExceptionBuilder.unauthorized();

    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<ConfigType['jwtSecret']>('jwtSecret'),
      })) as JwtPayload;

      request['authentication'] = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw ExceptionBuilder.unauthorized({
          errors: [ExceptionDict.tokenExpired()],
        });
      }
      throw ExceptionBuilder.unauthorized();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
