import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { Role } from 'src/roles.enum';
import { RequestWithUser } from '../interfaces/requestUser.interface.';
import { UserPayload } from '../interfaces/userPaylaod.interfase';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    const autentification = request.headers.authorization; //Bearer token
    if (!autentification) return false;

    const token = autentification.split(' ')[1];
    if (!token) return false;

    const secret = process.env.JWT_SECRET;

    try {
      const user: UserPayload = this.jwtService.verify(token, { secret });

      if (user.isAdmin) {
        user.roles = [Role.Admin];
      } else user.roles = [Role.User];

      request.user = user;

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
