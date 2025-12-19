import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { CoreCacheModule } from './core/cache/cache.module';
import { CoreConfigModule } from './core/config/config.module';
import { CoreDatabaseModule } from './core/database/database.module';
import { CoreEncryptModule } from './core/encrypt/encrypt.module';
import { CoreEventModule } from './core/event/event.module';
import { CoreQueueModule } from './core/queue/queue.module';
import { CoreScheduleModule } from './core/schedule/schedule.module';
import { CoreStorageModule } from './core/storage/storage.module';
import { CoreThrottlerModule } from './core/throttler/throttler.module';
import { CoreValidatorModule } from './core/validator/validator.module';
import { AuthModule } from './feature/auth/auth.module';
import { UsersModule } from './feature/users/users.module';

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
  CoreValidatorModule,
];

const featureModules = [UsersModule, AuthModule];

const providers = [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
];

@Module({
  imports: [...coreModules, ...featureModules],
  providers: [...providers],
})
export class AppModule {}
