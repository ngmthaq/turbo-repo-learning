import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';
import { RoleIdShouldExist } from '../../core/validator/role-id-should-exist.validator';
import { UserEmailShouldNotExist } from '../../core/validator/user-email-should-not-exist.validator';

import { strongPasswordConfig } from './strong-password-options';
import { UserGender } from './user-gender';

export class CreateUserDto {
  @Validate(UserEmailShouldNotExist)
  @IsEmail({}, { message: ExceptionDict.isEmail() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  email: string;

  @Validate(RoleIdShouldExist)
  @IsInt({ message: ExceptionDict.isInt() })
  @Type(() => Number)
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  roleId: number;

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
}
