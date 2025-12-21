import { Global, Module } from '@nestjs/common';

import { EmailShouldNotExist } from './providers/email-should-not-exist';

const providers = [EmailShouldNotExist];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class CoreValidatorModule {}
