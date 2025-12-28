import { IsString, Validate } from 'class-validator';

import { MultipleIdsWithCsvStringFormat } from '../../core/validator/multiple-ids-with-csv-string-format.validator';
import { ExceptionDict } from '../exception/exception-dict';

export class MultipleIdsParamDto {
  @Validate(MultipleIdsWithCsvStringFormat)
  @IsString({ message: ExceptionDict.isString() })
  ids: string;
}
