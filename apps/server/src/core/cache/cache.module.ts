import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

import { CoreConfigModule } from '../config/config.module';
import { ConfigType } from '../config/config-type';

/**
 * Core cache module that sets up caching for the application.
 * @see: https://docs.nestjs.com/techniques/caching
 */
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [CoreConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<ConfigType['cacheTtl']>('cacheTtl'),
      }),
    }),
  ],
  exports: [CacheModule],
})
export class CoreCacheModule {}
