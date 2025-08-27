import { UserDto } from 'src/Dtos/users.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/Dtos/auth.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(user: UserDto): Promise<Omit<import("../users/user.entity").User, "isAdmin">>;
    loginUser(credentials: LoginDto): Promise<string>;
    getAuthStatus(req: Request): "Logged in" | "Logged out";
    getProfile(req: Request): any;
}
