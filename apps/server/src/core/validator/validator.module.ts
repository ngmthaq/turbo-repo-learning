import { Global, Module } from '@nestjs/common';

import { MultipleIdsWithCsvStringFormat } from './multiple-ids-with-csv-string-format.validator';
import { UserEmailShouldNotExist } from './user-email-should-not-exist.validator';

const providers = [UserEmailShouldNotExist, MultipleIdsWithCsvStringFormat];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class CoreValidatorModule {}
