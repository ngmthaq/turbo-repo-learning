import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

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
    return this.authService.login(loginDto);
  }

  @Get('profile')
  public getProfile(@Req() req: AuthRequest) {
    return this.authService.getProfile(req.authentication.sub);
  }
}
