import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { FindByIdParam } from '../../utils/dto/find-by-id-param.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get('')
  public getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  public getUserById(@Param() params: FindByIdParam) {
    return this.usersService.getUserById(+params.id);
  }

  @Post('')
  public createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  public updateUser(
    @Param() params: FindByIdParam,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+params.id, body);
  }

  @Delete(':id')
  public deleteUser(@Param() params: FindByIdParam) {
    return this.usersService.deleteUser(+params.id);
  }
}
