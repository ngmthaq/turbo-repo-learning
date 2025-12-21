import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';

import { EmailShouldNotExist } from '../../../core/validator/providers/email-should-not-exist';
import { ExceptionDict } from '../../../utils/exception/exception-dict';

export class CreateUserDto {
  @Validate(EmailShouldNotExist)
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
