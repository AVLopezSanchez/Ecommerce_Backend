import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserDto } from 'src/Dtos/users.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/Dtos/auth.dto';
// import { WithoutPasswordInterceptor } from 'src/Interceptors/without-password.interceptor';
import { WithoutAdminInterceptor } from 'src/Interceptors/without-admin.interceptor';

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
}
