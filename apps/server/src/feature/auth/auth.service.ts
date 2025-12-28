import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';

import { ConfigType } from '../../core/config/config-type';
import { PrismaService } from '../../core/database/prisma.service';
import { EncryptService } from '../../core/encrypt/encrypt.service';
import { ExceptionBuilder } from '../../core/exception/exception-builder';
import { ResponseBuilder } from '../../core/response/response-builder';
import { generateToken } from '../../utils/string';
import { TokenType } from '../tokens/token-type';
import { UserEntity } from '../users/user-entity';

import { JwtPayload } from './auth-type';
import { LoginDto } from './login.dto';
import { RefreshTokenDto } from './refresh-token.dto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptionService: EncryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) throw ExceptionBuilder.unauthorized();
    const isPasswordValid = this.encryptionService.isMatch(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) throw ExceptionBuilder.unauthorized();
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    const refreshToken = generateToken();
    await this.prismaService.token.create({
      data: {
        userId: user.id,
        token: refreshToken,
        tokenType: TokenType.REFRESH_TOKEN,
        expiredAt: dayjs()
          .add(
            this.configService.get<ConfigType['refreshTokenExpirationNumber']>(
              'refreshTokenExpirationNumber',
            ),
            this.configService.get<ConfigType['refreshTokenExpirationUnit']>(
              'refreshTokenExpirationUnit',
            ) as dayjs.ManipulateType,
          )
          .toDate(),
      },
    });
    return ResponseBuilder.data({
      accessToken: token,
      refreshToken: refreshToken,
    });
  }

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const storedToken = await this.prismaService.token.findFirst({
      where: {
        token: refreshTokenDto.refreshToken,
        tokenType: TokenType.REFRESH_TOKEN,
      },
    });
    if (!storedToken || dayjs().isAfter(dayjs(storedToken.expiredAt))) {
      throw ExceptionBuilder.unauthorized();
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: storedToken.userId },
    });
    if (!user) throw ExceptionBuilder.unauthorized();
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    const newRefreshToken = generateToken();
    await this.prismaService.token.update({
      where: { id: storedToken.id },
      data: {
        token: newRefreshToken,
      },
    });
    return ResponseBuilder.data({
      accessToken: token,
      refreshToken: newRefreshToken,
    });
  }

  public async getProfile(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw ExceptionBuilder.unauthorized();
    return ResponseBuilder.data(new UserEntity(user));
  }
}
