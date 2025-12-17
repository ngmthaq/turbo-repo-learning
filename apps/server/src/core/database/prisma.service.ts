import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import { PrismaClient } from '../../../prisma-generated/client';
import { ConfigType } from '../config/config-type';

@Injectable()
export class PrismaService extends PrismaClient {
  public constructor(private readonly configService: ConfigService) {
    const url = configService.get<ConfigType['databaseUrl']>('databaseUrl');
    const adapter = new PrismaBetterSqlite3({ url });
    super({ adapter });
  }
}
