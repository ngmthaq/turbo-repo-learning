import { IsEmail } from 'class-validator';

export class FindByEmailParam {
  @IsEmail()
  email: string;
}
