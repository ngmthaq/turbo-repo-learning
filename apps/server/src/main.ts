/* eslint-disable no-console */

import * as os from 'os';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigType } from './core/config/config-type';
import { winstonLogger } from './utils/logger/winston';
import { HttpExceptionFilter } from './utils/filters/http-exception';
import { exceptionFactory } from './utils/exception/exception-factory';

async function enableVersioning(app: INestApplication) {
  const header = 'X-API-Version';
  const logger = new Logger('NestApplication');
  logger.log(`Enabled API Versioning with header: ${header}`);
  app.enableVersioning({
    type: VersioningType.HEADER,
    header,
  });
}

async function implementGlobalInterceptors(_app: INestApplication) {}

async function implementGlobalMiddlewares(app: INestApplication) {
  app.use(helmet());
}

async function implementGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      enableDebugMessages: true,
      exceptionFactory: exceptionFactory,
    }),
  );
}

async function implementGlobalGuards(_app: INestApplication) {}

async function implementGlobalFilters(app: INestApplication) {
  app.useGlobalFilters(new HttpExceptionFilter());
}

async function handleListenApp(port: number, startTime: number) {
  const duration = Date.now() - startTime;
  const nodeVersion = process.version;
  console.log(`\n[main.ts] - Node ${nodeVersion} ready in ${duration}ms`);
  console.log(`-> Local: http://localhost:${port} `);
  const networkInterfaces = os.networkInterfaces();
  let networkIP: string | null = null;
  for (const iface of Object.values(networkInterfaces)) {
    for (const addr of iface!) {
      if (addr.family === 'IPv4' && !addr.internal) {
        networkIP = addr.address;
        break;
      }
    }
    if (networkIP !== null) {
      console.log(`-> Network: http://${networkIP}:${port}`);
      console.log('\n');
      break;
    }
  }
}

async function startApp(app: INestApplication) {
  const configService = app.get(ConfigService);
  const port = configService.get<ConfigType['port']>('port');
  const startTime = Date.now();
  await app.listen(port, () => handleListenApp(port, startTime));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
  });

  await enableVersioning(app);
  await implementGlobalInterceptors(app);
  await implementGlobalMiddlewares(app);
  await implementGlobalPipes(app);
  await implementGlobalGuards(app);
  await implementGlobalFilters(app);
  await startApp(app);
}

bootstrap();
