import { IsEmail } from 'class-validator';

import { ExceptionDict } from '../exception/exception-dict';

export class FindByEmailParamDto {
  @IsEmail({}, { message: ExceptionDict.isEmail() })
  email: string;
}
