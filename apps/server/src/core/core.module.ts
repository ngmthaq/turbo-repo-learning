import { Module } from '@nestjs/common';

import { CoreConfigModule } from './config/config.module';
import { CoreCacheModule } from './cache/cache.module';
import { CoreScheduleModule } from './schedule/schedule.module';
import { CoreQueueModule } from './queue/queue.module';
import { CoreEventModule } from './event/event.module';

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
