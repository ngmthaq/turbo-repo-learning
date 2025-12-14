import { Module } from '@nestjs/common';

import { CoreConfigModule } from './config/config.module';
import { CoreCacheModule } from './cache/cache.module';

const coreModules = [CoreConfigModule, CoreCacheModule];

@Module({
  imports: coreModules,
  exports: coreModules,
})
export class CoreModule {}
