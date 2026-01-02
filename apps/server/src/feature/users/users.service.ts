import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Prisma } from '../../../prisma-generated/client';
import { ConfigType } from '../../core/config/config-type';
import { PrismaService } from '../../core/database/prisma.service';
import { EncryptService } from '../../core/encrypt/encrypt.service';
import { ResponseBuilder } from '../../core/response/response-builder';
import dayjs from '../../utils/date';
import { generateToken } from '../../utils/string';
import { TokenType } from '../tokens/token-type';

import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserEntity } from './user-entity';
import { UserGender } from './user-gender';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptionService: EncryptService,
    private readonly configService: ConfigService,
  ) {}

  public async getUsers() {
    const users = await this.prismaService.user.findMany();
    return ResponseBuilder.data(users.map((user) => new UserEntity(user)));
  }

  public async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user ? ResponseBuilder.data(new UserEntity(user)) : null;
  }

  public async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return user ? ResponseBuilder.data(new UserEntity(user)) : null;
  }

  public getUserGenders() {
    return ResponseBuilder.data(Object.values(UserGender));
  }

  public async createUser(
    transaction: Prisma.TransactionClient,
    data: CreateUserDto,
  ) {
    const hashedPassword = await this.encryptionService.hash(data.password);
    const encryptedData: CreateUserDto = { ...data, password: hashedPassword };
    const user = await transaction.user.create({ data: encryptedData });
    const expiredAt = this.configService.get<
      ConfigType['activationTokenExpiration']
    >('activationTokenExpiration');
    const token = await transaction.token.create({
      data: {
        userId: user.id,
        tokenType: TokenType.ACTIVATION_TOKEN,
        token: generateToken(),
        expiredAt: expiredAt(),
      },
    });
    this.logger.log(
      `TODO: Send activation token for user ${user.email}: ${token.token}`,
    );
    return ResponseBuilder.data(new UserEntity(user));
  }

  public async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.prismaService.user.update({ where: { id }, data });
    return ResponseBuilder.data(new UserEntity(user));
  }

  public async lockUser(id: number) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { lockedAt: dayjs().toDate() },
    });
    return ResponseBuilder.data(new UserEntity(user));
  }

  public async unlockUser(id: number) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { lockedAt: null },
    });
    return ResponseBuilder.data(new UserEntity(user));
  }

  public async deleteUser(id: number) {
    const user = await this.prismaService.user.delete({ where: { id } });
    return ResponseBuilder.data(new UserEntity(user));
  }

  public async deleteMultipleUsers(ids: number[]) {
    const users = await this.prismaService.user.deleteMany({
      where: { id: { in: ids } },
    });
    return ResponseBuilder.data({ deletedCount: users.count });
  }
}
