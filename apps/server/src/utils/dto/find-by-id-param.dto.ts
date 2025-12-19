import { IsNumberString } from 'class-validator';

export class FindByIdParam {
  @IsNumberString()
  id: string;
}
