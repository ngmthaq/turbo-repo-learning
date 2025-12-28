import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';
import { UserEmailShouldNotExist } from '../../core/validator/user-email-should-not-exist.validator';

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
