import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Action } from '../rbac/action';
import { Module } from '../rbac/module';
import { Rbac } from '../rbac/rbac.decorator';

import { CreateUserDto } from './create-user.dto';
import { IdParamDto } from './id-param.dto';
import { MultipleIdsParamDto } from './multiple-ids-param.dto';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @Rbac(Module.USERS, Action.READ)
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Get('genders')
  public getUserGenders() {
    return this.usersService.getUserGenders();
  }

  @Get(':id')
  @Rbac(Module.USERS, Action.READ)
  public getUserById(@Param() params: IdParamDto) {
    return this.usersService.getUserById(+params.id);
  }

  @Post()
  @Rbac(Module.USERS, Action.CREATE)
  public createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Put('lock/:id')
  @Rbac(Module.USERS, Action.LOCK_UNLOCK)
  public lockUser(@Param() params: IdParamDto) {
    return this.usersService.lockUser(+params.id);
  }

  @Put('unlock/:id')
  @Rbac(Module.USERS, Action.LOCK_UNLOCK)
  public unlockUser(@Param() params: IdParamDto) {
    return this.usersService.unlockUser(+params.id);
  }

  @Put(':id')
  @Rbac(Module.USERS, Action.UPDATE)
  public updateUser(@Param() params: IdParamDto, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(+params.id, body);
  }

  @Delete('multiple/:ids')
  @Rbac(Module.USERS, Action.DELETE)
  public deleteMultipleUsers(@Param() params: MultipleIdsParamDto) {
    const idArray = params.ids.split(',').map((id) => +id);
    return this.usersService.deleteMultipleUsers(idArray);
  }

  @Delete(':id')
  @Rbac(Module.USERS, Action.DELETE)
  public deleteUser(@Param() params: IdParamDto) {
    return this.usersService.deleteUser(+params.id);
  }
}
