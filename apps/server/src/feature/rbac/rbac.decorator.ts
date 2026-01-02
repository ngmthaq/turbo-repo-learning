import { SetMetadata } from '@nestjs/common';

import { Action } from './action';
import { Module } from './module';
import { Role } from './role';

export const RBAC_KEY = 'rbacDecorator';
export const Rbac = (module: Module, action: Action, roles: Role[]) => {
  return SetMetadata(RBAC_KEY, JSON.stringify({ module, action, roles }));
};
