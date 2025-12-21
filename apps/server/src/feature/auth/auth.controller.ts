import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { ResponseBuilder } from '../../utils/response/response-builder';

import { AuthRequest } from './auth-type';
import { AuthService } from './auth.service';
import { Public } from './decorators/public';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public login(@Body() loginDto: LoginDto) {
    return ResponseBuilder.data(this.authService.login(loginDto));
  }

  @Get('profile')
  public getProfile(@Req() req: AuthRequest) {
    return ResponseBuilder.data(
      this.authService.getProfile(req.authentication.sub),
    );
  }
}
