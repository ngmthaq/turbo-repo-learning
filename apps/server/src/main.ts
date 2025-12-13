/* eslint-disable no-console */

import * as os from 'os';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { ConfigType } from './core/config/config';

function handleListenApp(port: number, startTime: number) {
  const duration = Date.now() - startTime;
  const nodeVersion = process.version;
  console.log(`\n\x1b[32mNode ${nodeVersion} ready in ${duration} ms\x1b[0m`);
  console.log(`\x1b[36m-> Local: http://localhost:${port}\x1b[0m`);
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
      console.log(`\x1b[36m-> Network: http://${networkIP}:${port}\x1b[0m`);
      break;
    }
  }
}

async function bootstrap() {
  const startTime = Date.now();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<ConfigType['port']>('port');
  await app.listen(port, () => handleListenApp(port, startTime));
}

bootstrap();
