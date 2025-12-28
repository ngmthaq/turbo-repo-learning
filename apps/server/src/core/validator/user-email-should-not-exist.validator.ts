import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { ExceptionDict } from '../../utils/exception/exception-dict';
import { PrismaService } from '../database/prisma.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserEmailShouldNotExist implements ValidatorConstraintInterface {
  public constructor(private readonly prismaService: PrismaService) {}

  public async validate(email: string, _args: ValidationArguments) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return !user;
  }

  public defaultMessage(_args: ValidationArguments) {
    return ExceptionDict.userEmailShouldNotExist();
  }
}
