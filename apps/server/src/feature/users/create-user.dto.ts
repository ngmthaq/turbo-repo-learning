import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';

import { UserEmailShouldNotExist } from '../../core/validator/user-email-should-not-exist.validator';
import { ExceptionDict } from '../../utils/exception/exception-dict';

export class CreateUserDto {
  @Validate(UserEmailShouldNotExist)
  @IsEmail({}, { message: ExceptionDict.isEmail() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  email: string;

  @IsString({ message: ExceptionDict.isString() })
  @IsOptional()
  name?: string;

  @IsStrongPassword({}, { message: ExceptionDict.isStrongPassword() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  password: string;
}
