import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from './config';

/**
 * Core configuration module that loads environment variables and configuration settings.
 * @see: https://docs.nestjs.com/techniques/configuration
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      load: [config],
    }),
  ],
  exports: [ConfigModule],
})
export class CoreConfigModule {}
