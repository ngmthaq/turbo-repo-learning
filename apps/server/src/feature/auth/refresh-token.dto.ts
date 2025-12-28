import { IsNotEmpty, IsString } from 'class-validator';

import { ExceptionDict } from '../../core/exception/exception-dict';

export class RefreshTokenDto {
  @IsString({ message: ExceptionDict.isString() })
  @IsNotEmpty({ message: ExceptionDict.isNotEmpty() })
  refreshToken: string;
}
