import { Module } from '@nestjs/common';

import { CoreConfigModule } from './config/config.module';
import { CoreCacheModule } from './cache/cache.module';
import { CoreScheduleModule } from './schedule/schedule.module';

const coreModules = [CoreConfigModule, CoreCacheModule, CoreScheduleModule];

@Module({
  imports: coreModules,
  exports: coreModules,
})
export class CoreModule {}
