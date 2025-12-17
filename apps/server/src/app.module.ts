import { Module } from '@nestjs/common';

import { CoreCacheModule } from './core/cache/cache.module';
import { CoreConfigModule } from './core/config/config.module';
import { CoreDatabaseModule } from './core/database/database.module';
import { CoreEncryptModule } from './core/encrypt/encrypt.module';
import { CoreEventModule } from './core/event/event.module';
import { CoreQueueModule } from './core/queue/queue.module';
import { CoreScheduleModule } from './core/schedule/schedule.module';
import { CoreStorageModule } from './core/storage/storage.module';
import { GlobalThrottlerGuard } from './core/throttler/global-throttler-guard';
import { CoreThrottlerModule } from './core/throttler/throttler.module';

const coreModules = [
  CoreConfigModule,
  CoreEncryptModule,
  CoreCacheModule,
  CoreScheduleModule,
  CoreQueueModule,
  CoreEventModule,
  CoreStorageModule,
  CoreThrottlerModule,
  CoreDatabaseModule,
];

@Module({
  imports: [...coreModules],
  providers: [GlobalThrottlerGuard],
})
export class AppModule {}
