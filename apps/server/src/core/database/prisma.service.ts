import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import { PrismaClient } from '../../../prisma-generated/client';
import { ConfigType } from '../config/config-type';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  public constructor(private readonly configService: ConfigService) {
    const url = configService.get<ConfigType['databaseUrl']>('databaseUrl');
    const adapter = new PrismaBetterSqlite3({ url });
    super({
      adapter: adapter,
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });
  }

  public async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
    this.$on('query', (event) => {
      this.logger.log(
        `Query: ${event.query} | Params: ${event.params} | Duration: ${event.duration}ms`,
      );
    });
    this.$on('error', (event) => {
      this.logger.error(`Error: ${event.message}`);
    });
    this.$on('info', (event) => {
      this.logger.log(`Info: ${event.message}`);
    });
    this.$on('warn', (event) => {
      this.logger.warn(`Warn: ${event.message}`);
    });
  }
}
