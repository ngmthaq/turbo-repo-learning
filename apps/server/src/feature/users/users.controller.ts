import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { FindByIdParamDto } from '../../utils/dto/find-by-id-param.dto';
import { MultipleIdsParamDto } from '../../utils/dto/multiple-ids-param.dto';

import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  public getUserById(@Param() params: FindByIdParamDto) {
    return this.usersService.getUserById(+params.id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  public updateUser(
    @Param() params: FindByIdParamDto,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+params.id, body);
  }

  @Delete('soft/multiple/:ids')
  public softDeleteMultipleUsers(@Param() params: MultipleIdsParamDto) {
    const idArray = params.ids.split(',').map((id) => +id);
    return this.usersService.softDeleteMultipleUsers(idArray);
  }

  @Delete('soft/:id')
  public softDeleteUser(@Param() params: FindByIdParamDto) {
    return this.usersService.softDeleteUser(+params.id);
  }

  @Delete('multiple/:ids')
  public deleteMultipleUsers(@Param() params: MultipleIdsParamDto) {
    const idArray = params.ids.split(',').map((id) => +id);
    return this.usersService.deleteMultipleUsers(idArray);
  }

  @Delete(':id')
  public deleteUser(@Param() params: FindByIdParamDto) {
    return this.usersService.deleteUser(+params.id);
  }

  @Get('genders')
  public getUserGenders() {
    return this.usersService.getUserGenders();
  }
}
