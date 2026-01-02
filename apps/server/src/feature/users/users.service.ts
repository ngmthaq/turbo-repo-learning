import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';
import { EncryptService } from '../../core/encrypt/encrypt.service';
import { ResponseBuilder } from '../../core/response/response-builder';
import dayjs from '../../utils/date';
import { Role } from '../rbac/role';

import { CreateUserDto } from './create-user.dto';
import { generateStrongPassword } from './strong-password-options';
import { UpdateUserDto } from './update-user.dto';
import { UserEntity } from './user-entity';
import { UserGender } from './user-gender';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptionService: EncryptService,
  ) {}

  public async getUsers() {
    const users = await this.prismaService.user.findMany();
    return ResponseBuilder.data(users.map((user) => new UserEntity(user)));
  }

  public async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return ResponseBuilder.data(user ? new UserEntity(user) : null);
  }

  public async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return ResponseBuilder.data(user ? new UserEntity(user) : null);
  }

  public getUserGenders() {
    return ResponseBuilder.data(Object.values(UserGender));
  }

  public async createUser(data: CreateUserDto) {
    const password = data.password || generateStrongPassword();
    const role = data.role || Role.USER;
    const hashedPassword = await this.encryptionService.hash(password);
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        role: role,
        password: hashedPassword,
        activatedAt: dayjs().toDate(),
      },
    });
    this.logger.log(
      `TODO: Send activation email to user with email: ${user.email} and password: ${password}`,
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
