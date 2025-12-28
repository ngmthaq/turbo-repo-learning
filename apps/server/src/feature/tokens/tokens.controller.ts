import { Controller, Delete, Param } from '@nestjs/common';

import { FindByIdParamDto } from '../../core/dto/find-by-id-param.dto';

import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  public constructor(private readonly tokensService: TokensService) {}

  @Delete(':id')
  public async deleteTokenById(@Param() params: FindByIdParamDto) {
    return this.tokensService.deleteTokenById(+params.id);
  }
}
