import { IsNotEmpty, IsString, Validate } from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';
import { TokenShouldExist } from '../../core/validator/token-should-exist.validator';

export class RefreshTokenDto {
  @Validate(TokenShouldExist)
  @IsString({ message: ExceptionDict.isString() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  refreshToken: string;
}
