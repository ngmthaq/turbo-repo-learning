import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';

import { ActivateUserDto } from './activate-user.dto';
import { AuthRequest } from './auth-type';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { Public } from './public.decorator';
import { RefreshTokenDto } from './refresh-token.dto';
import { RegisterDto } from './register.dto';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  public refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  public register(@Body() registerDto: RegisterDto) {
    return this.prismaService.$transaction(async (transaction) => {
      return this.authService.register(transaction, registerDto);
    });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('activate/:token')
  public activateUser(@Param() params: ActivateUserDto) {
    return this.prismaService.$transaction(async (transaction) => {
      return this.authService.activateUser(transaction, params.token);
    });
  }

  @Get('profile')
  public getProfile(@Req() req: AuthRequest) {
    return this.authService.getProfile(req.authentication.sub);
  }
}
