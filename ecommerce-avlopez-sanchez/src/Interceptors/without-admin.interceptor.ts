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
export class WithoutAdminInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user: User) => this.withoutAdmin(user));
        } else if (data && typeof data === 'object') {
          return this.withoutAdmin(data as User);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
      }),
    );
  }

  private withoutAdmin(user: User): Omit<User, 'isAdmin'> {
    if (!user) return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isAdmin, ...rest } = user;
    return rest;
  }
}
