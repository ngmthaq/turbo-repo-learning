import { IsString, Validate } from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';
import { MultipleIdsWithCsvStringFormat } from '../../core/validator/multiple-ids-with-csv-string-format.validator';
import { MultipleUserIdsShouldExist } from '../../core/validator/multiple-user-ids-should-exist.validator';

export class MultipleIdsParamDto {
  @Validate(MultipleUserIdsShouldExist)
  @Validate(MultipleIdsWithCsvStringFormat)
  @IsString({ message: ExceptionDict.isString() })
  ids: string;
}
