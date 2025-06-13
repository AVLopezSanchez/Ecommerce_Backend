import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/Dtos/users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.usersService.getUsers(+page, +limit);
    }
    return this.usersService.getUsers(1, 5);
  }

  // @Get(':id')
  // @UseGuards(AuthGuard)
  // getUserById(@Param('id') id: string) {
  //   return this.usersService.getUserById(id);
  // }

  @Post()
  createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  // @Put(':id')
  // @UseGuards(AuthGuard)
  // @UseGuards(AuthGuard)
  // updateUser(@Param('id') id: string) {
  //   return this.usersService.updateUserById(id);
  // }

  // @Delete(':id')
  // @UseGuards(AuthGuard)
  // @UseGuards(AuthGuard)
  // deleteUser(@Param('id') id: string) {
  //   return this.usersService.deleteUserById(id);
  // }
}
