import { Module } from '@nestjs/common';

import { CoreCacheModule } from './cache/cache.module';
import { CoreConfigModule } from './config/config.module';
import { CoreEventModule } from './event/event.module';
import { CoreQueueModule } from './queue/queue.module';
import { CoreScheduleModule } from './schedule/schedule.module';

const coreModules = [
  CoreConfigModule,
  CoreCacheModule,
  CoreScheduleModule,
  CoreQueueModule,
  CoreEventModule,
];

@Module({
  imports: coreModules,
  exports: coreModules,
})
export class CoreModule {}
