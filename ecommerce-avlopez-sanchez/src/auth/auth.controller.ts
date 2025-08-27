import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from 'src/Dtos/users.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/Dtos/auth.dto';
// import { WithoutPasswordInterceptor } from 'src/Interceptors/without-password.interceptor';
import { WithoutAdminInterceptor } from 'src/Interceptors/without-admin.interceptor';
import { Request } from 'express';
import { RequiresAuth } from 'src/decorates/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(WithoutAdminInterceptor)
  registerUser(@Body() user: UserDto) {
    return this.authService.registerUser(user);
  }

  @Post('singin')
  loginUser(@Body() credentials: LoginDto) {
    return this.authService.loginUser(credentials);
  }

  @Get('')
  getAuthStatus(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return req.oidc?.isAuthenticated() ? 'Logged in' : 'Logged out';
  }

  @Get('profile')
  @RequiresAuth()
  getProfile(@Req() req: Request) {
    return req.oidc.user;
  }
}
