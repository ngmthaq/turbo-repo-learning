import { IsInt, IsNotEmpty, Validate } from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';
import { UserIdShouldExist } from '../../core/validator/user-id-should-exist.validator';

export class IdParamDto {
  @Validate(UserIdShouldExist)
  @IsInt({ message: ExceptionDict.isInt() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  id: number;
}
