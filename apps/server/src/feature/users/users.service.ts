import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';
import { EncryptService } from '../../core/encrypt/encrypt.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user-entity';

@Injectable()
export class UsersService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptionService: EncryptService,
  ) {}

  public async getUsers() {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  public async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return user ? new UserEntity(user) : null;
  }

  public async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return user ? new UserEntity(user) : null;
  }

  public async createUser(data: CreateUserDto) {
    const hashedPassword = await this.encryptionService.hash(data.password);
    const encryptedData: CreateUserDto = { ...data, password: hashedPassword };
    const user = await this.prismaService.user.create({ data: encryptedData });
    return new UserEntity(user);
  }

  public async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.prismaService.user.update({ where: { id }, data });
    return new UserEntity(user);
  }

  public async deleteUser(id: number) {
    const user = await this.prismaService.user.delete({ where: { id } });
    return new UserEntity(user);
  }
}
