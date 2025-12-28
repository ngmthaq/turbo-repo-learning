import { Exclude } from 'class-transformer';

import { Prisma } from '../../../prisma-generated/client';

export class UserEntity implements Prisma.UserModel {
  id: number;
  email: string;
  name: string | null;

  @Exclude()
  password: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  refreshTokens?: Prisma.TokenModel[] | null;

  public constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
