import { IsNotEmpty, IsString } from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';

export class ActivateUserDto {
  @IsString({ message: ExceptionDict.isString() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  token: string;
}
