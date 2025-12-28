import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { PrismaService } from '../../core/database/prisma.service';
import { EncryptService } from '../../core/encrypt/encrypt.service';
import { ResponseBuilder } from '../../core/response/response-builder';

import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserEntity } from './user-entity';
import { UserGender } from './user-gender';

@Injectable()
export class UsersService {
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
    return user ? ResponseBuilder.data(new UserEntity(user)) : null;
  }

  public async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return user ? ResponseBuilder.data(new UserEntity(user)) : null;
  }

  public async createUser(data: CreateUserDto) {
    const hashedPassword = await this.encryptionService.hash(data.password);
    const encryptedData: CreateUserDto = { ...data, password: hashedPassword };
    const user = await this.prismaService.user.create({ data: encryptedData });
    return ResponseBuilder.data(new UserEntity(user));
  }

  public async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.prismaService.user.update({ where: { id }, data });
    return ResponseBuilder.data(new UserEntity(user));
  }

  public async deleteUser(id: number) {
    const user = await this.prismaService.user.delete({ where: { id } });
    return ResponseBuilder.data(new UserEntity(user));
  }

  public async deleteMultipleUsers(ids: number[]) {
    const batch = await this.prismaService.user.deleteMany({
      where: { id: { in: ids } },
    });
    return ResponseBuilder.data(batch);
  }

  public async softDeleteUser(id: number) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: dayjs().toDate() },
    });
    return ResponseBuilder.data(new UserEntity(user));
  }

  public async softDeleteMultipleUsers(ids: number[]) {
    const batch = await this.prismaService.user.updateMany({
      where: { id: { in: ids } },
      data: { deletedAt: dayjs().toDate() },
    });
    return ResponseBuilder.data(batch);
  }

  public getUserGenders() {
    return ResponseBuilder.data(Object.values(UserGender));
  }
}
