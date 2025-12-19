import { Global, Module } from '@nestjs/common';

import { IsEmailExistedValidator } from './providers/is-email-existed';

const providers = [IsEmailExistedValidator];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class CoreValidatorModule {}
