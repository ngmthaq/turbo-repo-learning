import { Module } from '@nestjs/common';

import { CoreConfigModule } from './config/config.module';

@Module({
  imports: [CoreConfigModule],
  exports: [CoreConfigModule],
})
export class CoreModule {}
