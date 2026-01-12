import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Public } from '../auth/public.decorator';

import { Action } from './action';
import { CreateRbacDto } from './create-rbac.dto';
import { CreateRoleDto } from './create-role.dto';
import { GetRbacListDto } from './get-rbac-list.dto';
import { GetRoleListDto } from './get-role-list.dto';
import { Module } from './module';
import { RbacIdParamDto } from './rbac-id-param.dto';
import { RbacMultipleIdsParamDto } from './rbac-multiple-ids-param.dto';
import { RbacRoleIdParamDto } from './rbac-role-id-param.dto';
import { Rbac } from './rbac.decorator';
import { RbacService } from './rbac.service';
import { RoleIdParamForDeleteDto } from './role-id-param-for-delete.dto';
import { RoleIdParamForUpdateDto } from './role-id-param-for-update.dto';
import { RoleIdParamDto } from './role-id-param.dto';
import { RoleMultipleIdsParamForDeleteDto } from './role-multiple-ids-param-for-delete.dto';
import { UpdateRbacDto } from './update-rbac.dto';
import { UpdateRoleDto } from './update-role.dto';

@Controller('rbac')
export class RbacController {
  public constructor(private readonly rbacService: RbacService) {}

  @Get()
  @Rbac(Module.RBAC, Action.READ)
  public getRbacList(@Query() query: GetRbacListDto) {
    return this.rbacService.getRbacList(query);
  }

  @Get('modules')
  @Public()
  public getModules() {
    return this.rbacService.getModules();
  }

  @Get('actions')
  @Public()
  public getActions() {
    return this.rbacService.getActions();
  }

  @Get('role/:roleId')
  @Rbac(Module.RBAC, Action.READ)
  public getRbacByRoleId(@Param() params: RbacRoleIdParamDto) {
    return this.rbacService.getRbacByRoleId(params);
  }

  @Get(':id')
  @Rbac(Module.RBAC, Action.READ)
  public getRbacById(@Param() params: RbacIdParamDto) {
    return this.rbacService.getRbacById(params);
  }

  @Post()
  @Rbac(Module.RBAC, Action.CREATE)
  public createRbac(@Body() body: CreateRbacDto) {
    return this.rbacService.createRbac(body);
  }

  @Put(':id')
  @Rbac(Module.RBAC, Action.UPDATE)
  public updateRbac(
    @Param() params: RbacIdParamDto,
    @Body() body: UpdateRbacDto,
  ) {
    return this.rbacService.updateRbac(params, body);
  }

  @Delete('multiple/:ids')
  @Rbac(Module.RBAC, Action.DELETE)
  public deleteMultipleRbac(@Param() params: RbacMultipleIdsParamDto) {
    return this.rbacService.deleteMultipleRbac(params);
  }

  @Delete(':id')
  @Rbac(Module.RBAC, Action.DELETE)
  public deleteRbac(@Param() params: RbacIdParamDto) {
    return this.rbacService.deleteRbac(params);
  }

  @Get('roles')
  @Rbac(Module.ROLES, Action.READ)
  public getRoleList(@Query() query: GetRoleListDto) {
    return this.rbacService.getRoleList(query);
  }

  @Get('roles/:id')
  @Rbac(Module.ROLES, Action.READ)
  public getRoleById(@Param() params: RoleIdParamDto) {
    return this.rbacService.getRoleById(params);
  }

  @Post('roles')
  @Rbac(Module.ROLES, Action.CREATE)
  public createRole(@Body() body: CreateRoleDto) {
    return this.rbacService.createRole(body);
  }

  @Put('roles/:id')
  @Rbac(Module.ROLES, Action.UPDATE)
  public updateRole(
    @Param() params: RoleIdParamForUpdateDto,
    @Body() body: UpdateRoleDto,
  ) {
    return this.rbacService.updateRole(params, body);
  }

  @Delete('roles/multiple/:ids')
  @Rbac(Module.ROLES, Action.DELETE)
  public deleteMultipleRoles(
    @Param() params: RoleMultipleIdsParamForDeleteDto,
  ) {
    return this.rbacService.deleteMultipleRoles(params);
  }

  @Delete('roles/:id')
  @Rbac(Module.ROLES, Action.DELETE)
  public deleteRole(@Param() params: RoleIdParamForDeleteDto) {
    return this.rbacService.deleteRole(params);
  }
}
