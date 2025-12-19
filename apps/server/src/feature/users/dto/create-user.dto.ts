import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';

import { IsEmailExistedValidator } from '../../../core/validator/providers/is-email-existed';
import { ExceptionDict } from '../../../utils/exception/exception-dict';

export class CreateUserDto {
  @Validate(IsEmailExistedValidator)
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
