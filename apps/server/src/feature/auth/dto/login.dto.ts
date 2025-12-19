import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ExceptionDict } from '../../../utils/exception/exception-dict';

export class LoginDto {
  @IsEmail({}, { message: ExceptionDict.isEmail() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  email: string;

  @IsString({ message: ExceptionDict.isString() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  password: string;
}
