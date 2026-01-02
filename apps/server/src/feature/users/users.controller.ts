import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';

import { CreateUserDto } from './create-user.dto';
import { IdParamDto } from './id-param.dto';
import { MultipleIdsParamDto } from './multiple-ids-param.dto';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  public constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Get('genders')
  public getUserGenders() {
    return this.usersService.getUserGenders();
  }

  @Get(':id')
  public getUserById(@Param() params: IdParamDto) {
    return this.usersService.getUserById(+params.id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto) {
    return this.prismaService.$transaction(async (transaction) => {
      return this.usersService.createUser(transaction, body);
    });
  }

  @Put('lock/:id')
  public lockUser(@Param() params: IdParamDto) {
    return this.usersService.lockUser(+params.id);
  }

  @Put('unlock/:id')
  public unlockUser(@Param() params: IdParamDto) {
    return this.usersService.unlockUser(+params.id);
  }

  @Put(':id')
  public updateUser(@Param() params: IdParamDto, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(+params.id, body);
  }

  @Delete('multiple/:ids')
  public deleteMultipleUsers(@Param() params: MultipleIdsParamDto) {
    const idArray = params.ids.split(',').map((id) => +id);
    return this.usersService.deleteMultipleUsers(idArray);
  }

  @Delete(':id')
  public deleteUser(@Param() params: IdParamDto) {
    return this.usersService.deleteUser(+params.id);
  }
}
