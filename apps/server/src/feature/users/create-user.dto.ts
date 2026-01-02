import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';
import { UserEmailShouldNotExist } from '../../core/validator/user-email-should-not-exist.validator';
import { Role } from '../rbac/role';

import { strongPasswordConfig } from './strong-password-options';
import { UserGender } from './user-gender';

export class CreateUserDto {
  @Validate(UserEmailShouldNotExist)
  @IsEmail({}, { message: ExceptionDict.isEmail() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  email: string;

  @IsString({ message: ExceptionDict.isString() })
  @IsOptional()
  name?: string;

  @IsStrongPassword(strongPasswordConfig, {
    message: ExceptionDict.isStrongPassword(strongPasswordConfig),
  })
  @IsString({ message: ExceptionDict.isString() })
  @IsOptional()
  password?: string;

  @IsString({ message: ExceptionDict.isString() })
  @IsOptional()
  phone?: string;

  @IsString({ message: ExceptionDict.isString() })
  @IsOptional()
  address?: string;

  @IsEnum(UserGender, {
    message: ExceptionDict.isEnum(UserGender),
  })
  @IsString({ message: ExceptionDict.isString() })
  @IsOptional()
  gender?: string;

  @IsDateString({}, { message: ExceptionDict.isDateString() })
  @IsOptional()
  dateOfBirth?: string;

  @IsEnum(Role, { message: ExceptionDict.isEnum(Role) })
  @IsString({ message: ExceptionDict.isString() })
  @IsOptional()
  role?: string;
}
