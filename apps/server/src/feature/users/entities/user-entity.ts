import { Exclude } from 'class-transformer';

import { Prisma } from '../../../../prisma-generated/client';

export class UserEntity implements Prisma.UserModel {
  id: number;
  email: string;
  name: string | null;

  @Exclude()
  password: string;

  public constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
