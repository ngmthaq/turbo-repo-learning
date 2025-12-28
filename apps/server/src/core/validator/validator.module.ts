import { Global, Module } from '@nestjs/common';

import { MultipleIdsWithCsvStringFormat } from './multiple-ids-with-csv-string-format.validator';
import { MultipleUserIdsShouldExist } from './multiple-user-ids-should-exist.validator';
import { UserEmailShouldNotExist } from './user-email-should-not-exist.validator';
import { UserIdShouldExist } from './user-id-should-exist.validator';

const providers = [
  UserEmailShouldNotExist,
  MultipleIdsWithCsvStringFormat,
  UserIdShouldExist,
  MultipleUserIdsShouldExist,
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class CoreValidatorModule {}
