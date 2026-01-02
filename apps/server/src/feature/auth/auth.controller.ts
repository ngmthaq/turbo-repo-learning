import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';

import { PrismaService } from '../../core/database/prisma.service';

import { ActivateUserDto } from './activate-user.dto';
import { AuthRequest } from './auth-type';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './forgot-password.dto';
import { LoginDto } from './login.dto';
import { Public } from './public.decorator';
import { RefreshTokenDto } from './refresh-token.dto';
import { RegisterDto } from './register.dto';
import { ResetPasswordDto } from './reset-password.dto';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  @Public()
  @Post('login')
  public login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  public refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Public()
  @Post('register')
  public register(@Body() registerDto: RegisterDto) {
    return this.prismaService.$transaction(async (transaction) => {
      return this.authService.register(transaction, registerDto);
    });
  }

  @Public()
  @Post('activate/:token')
  public activateUser(@Param() params: ActivateUserDto) {
    return this.prismaService.$transaction(async (transaction) => {
      return this.authService.activateUser(transaction, params.token);
    });
  }

  @Public()
  @Post('password/forgot')
  public forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Public()
  @Post('password/reset')
  public resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.prismaService.$transaction(async (transaction) => {
      return this.authService.resetPassword(transaction, resetPasswordDto);
    });
  }

  @Public()
  @Get('profile')
  public getProfile(@Req() req: AuthRequest) {
    return this.authService.getProfile(req.authentication.sub);
  }
}
