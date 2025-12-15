import { Module } from '@nestjs/common';

import { CoreConfigModule } from './core/config/config.module';
import { CoreCacheModule } from './core/cache/cache.module';
import { CoreScheduleModule } from './core/schedule/schedule.module';
import { CoreQueueModule } from './core/queue/queue.module';
import { CoreEventModule } from './core/event/event.module';
import { CoreStorageModule } from './core/storage/storage.module';
import { CoreThrottlerModule } from './core/throttler/throttler.module';
import { GlobalThrottlerGuard } from './core/throttler/global-throttler-guard';

const coreModules = [
  CoreConfigModule,
  CoreCacheModule,
  CoreScheduleModule,
  CoreQueueModule,
  CoreEventModule,
  CoreStorageModule,
  CoreThrottlerModule,
];

@Module({
  imports: [...coreModules],
  providers: [GlobalThrottlerGuard],
})
export class AppModule {}
