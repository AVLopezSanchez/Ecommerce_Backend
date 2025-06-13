import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const autentifacation = request.headers.authorization;
    if (!autentifacation) return false;
    const content = autentifacation.split(' ')[1];
    if (!content) return false;
    const [name, password] = content.split(':');
    if (!name || !password) return false;

    return true;
  }
}
