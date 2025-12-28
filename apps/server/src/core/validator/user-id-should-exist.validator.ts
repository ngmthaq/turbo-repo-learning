import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { PrismaService } from '../database/prisma.service';
import { ExceptionDict } from '../exception/exception-dict';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserIdShouldExist implements ValidatorConstraintInterface {
  public constructor(private readonly prismaService: PrismaService) {}

  public async validate(id: string, _args: ValidationArguments) {
    const user = await this.prismaService.user.findUnique({
      where: { id: Number(id) },
    });

    return !!user;
  }

  public defaultMessage(_args: ValidationArguments) {
    return ExceptionDict.userIdShouldExist();
  }
}
