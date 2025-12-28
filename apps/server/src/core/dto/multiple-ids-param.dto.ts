import { IsString, Validate } from 'class-validator';

import { ExceptionDict } from '../exception/exception-dict';
import { MultipleIdsWithCsvStringFormat } from '../validator/multiple-ids-with-csv-string-format.validator';

export class MultipleIdsParamDto {
  @Validate(MultipleIdsWithCsvStringFormat)
  @IsString({ message: ExceptionDict.isString() })
  ids: string;
}
