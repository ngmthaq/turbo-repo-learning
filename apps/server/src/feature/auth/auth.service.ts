import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';
import { EncryptService } from '../../core/encrypt/encrypt.service';
import { ExceptionBuilder } from '../../utils/exception/exception-builder';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptionService: EncryptService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw ExceptionBuilder.unauthorized();
    const isPasswordValid = this.encryptionService.isMatch(
      password,
      user.password,
    );
    if (!isPasswordValid) throw ExceptionBuilder.unauthorized();
    const { password: _, ...result } = user;
    return result;
  }
}
