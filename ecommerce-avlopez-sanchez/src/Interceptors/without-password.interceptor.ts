/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/users/user.entity';

@Injectable()
export class WithoutPasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user: User) => this.withoutPassword(user));
        } else if (data && typeof data === 'object') {
          return this.withoutPassword(data as User);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
      }),
    );
  }

  private withoutPassword(user: User): Omit<User, 'password' | 'password2'> {
    if (!user) return user;
    const { password, ...rest } = user;
    return rest;
  }
}
