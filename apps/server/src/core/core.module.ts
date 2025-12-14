import { Module } from '@nestjs/common';

import { CoreConfigModule } from './config/config.module';
import { CoreCacheModule } from './cache/cache.module';
import { CoreScheduleModule } from './schedule/schedule.module';
import { CoreQueueModule } from './queue/queue.module';

const coreModules = [
  CoreConfigModule,
  CoreCacheModule,
  CoreScheduleModule,
  CoreQueueModule,
];

@Module({
  imports: coreModules,
  exports: coreModules,
})
export class CoreModule {}
