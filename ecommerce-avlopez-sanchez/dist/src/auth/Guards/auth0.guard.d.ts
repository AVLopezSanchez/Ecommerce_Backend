import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class Auth0Guard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
