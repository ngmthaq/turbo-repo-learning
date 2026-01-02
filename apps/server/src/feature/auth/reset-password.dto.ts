import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';
import { TokenShouldExist } from '../../core/validator/token-should-exist.validator';
import { strongPasswordConfig } from '../users/strong-password-options';

export class ResetPasswordDto {
  @Validate(TokenShouldExist)
  @IsString({ message: ExceptionDict.isString() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  token: string;

  @IsStrongPassword(strongPasswordConfig, {
    message: ExceptionDict.isStrongPassword(strongPasswordConfig),
  })
  @IsString({ message: ExceptionDict.isString() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  newPassword: string;
}
