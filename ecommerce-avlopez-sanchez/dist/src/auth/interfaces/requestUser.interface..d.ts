import { Request } from 'express';
import { UserPayload } from './userPaylaod.interfase';
export interface RequestWithUser extends Request {
    user: UserPayload;
}
