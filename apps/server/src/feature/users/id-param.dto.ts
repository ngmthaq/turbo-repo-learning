import { IsNumberString, Validate } from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';
import { UserIdShouldExist } from '../../core/validator/user-id-should-exist.validator';

export class IdParamDto {
  @Validate(UserIdShouldExist)
  @IsNumberString({}, { message: ExceptionDict.isNumberString() })
  id: string;
}
