import { IsNumberString } from 'class-validator';

import { ExceptionDict } from '../exception/exception-dict';

export class FindByIdParamDto {
  @IsNumberString({}, { message: ExceptionDict.isNumberString() })
  id: string;
}
