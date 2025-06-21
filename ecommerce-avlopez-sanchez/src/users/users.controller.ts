import {
  Controller,
  Get,
  UseGuards,
  Query,
  UseInterceptors,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/decorates/role.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WithoutPasswordInterceptor } from 'src/Interceptors/without-password.interceptor';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { WithoutAdminInterceptor } from 'src/Interceptors/without-admin.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(WithoutPasswordInterceptor)
  getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.usersService.getUsers(+page, +limit);
    }
    return this.usersService.getUsers(1, 5);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(WithoutPasswordInterceptor, WithoutAdminInterceptor)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }
}
