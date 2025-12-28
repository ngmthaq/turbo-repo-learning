import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { ExceptionDict } from '../../utils/exception/exception-dict';

@Injectable()
@ValidatorConstraint({ async: true })
export class MultipleIdsWithCsvStringFormat implements ValidatorConstraintInterface {
  public async validate(ids: string, _args: ValidationArguments) {
    const regex = /^(\d+,)*\d+$/;
    return regex.test(ids);
  }

  public defaultMessage(_args: ValidationArguments) {
    return ExceptionDict.multipleIdsWithCsvStringFormat();
  }
}
