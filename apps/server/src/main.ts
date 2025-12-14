/* eslint-disable no-console */

import * as os from 'os';
import path from 'path';

import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { ConfigType } from './core/config/config-type';
import { exceptionFactory } from './utils/exception/exception-factory';
import { HttpExceptionFilter } from './utils/filters/http-exception';
import { winstonLogger } from './utils/logger/winston';

/**
 * Enable API versioning
 * @see: https://docs.nestjs.com/techniques/versioning
 */
async function enableVersioning(app: NestExpressApplication) {
  const header = 'X-API-Version';
  const logger = new Logger('NestApplication');
  logger.log(`Enabled API Versioning with header: ${header}`);
  app.enableVersioning({
    type: VersioningType.HEADER,
    header,
  });
}

/**
 * Implement global interceptors
 * @see: https://docs.nestjs.com/interceptors
 */
async function implementGlobalInterceptors(_app: NestExpressApplication) {}

/**
 * Implement global middlewares
 * @see: https://docs.nestjs.com/middleware
 */
async function implementGlobalMiddlewares(app: NestExpressApplication) {
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());
}

/**
 * Implement global pipes
 * @see: https://docs.nestjs.com/pipes
 */
async function implementGlobalPipes(app: NestExpressApplication) {
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

/**
 * Implement global guards
 * @see: https://docs.nestjs.com/guards
 */
async function implementGlobalGuards(_app: NestExpressApplication) {}

/**
 * Implement global filters
 * @see: https://docs.nestjs.com/exception-filters
 */
async function implementGlobalFilters(app: NestExpressApplication) {
  app.useGlobalFilters(new HttpExceptionFilter());
}

/**
 * Handle application listen event
 * @param port
 * @param startTime
 */
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

/**
 * Start the NestJS application
 * @param app
 */
async function startApp(app: NestExpressApplication) {
  const configService = app.get(ConfigService);
  const port = configService.get<ConfigType['port']>('port');
  const startTime = Date.now();
  await app.listen(port, () => handleListenApp(port, startTime));
}

/**
 * Bootstrap the NestJS application
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
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
