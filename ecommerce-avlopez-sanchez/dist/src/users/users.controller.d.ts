import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(page: string, limit: string): Promise<import("./user.entity").User[]>;
    getUserById(id: string): Promise<import("./user.entity").User>;
    changeUserRole(userId: string, role: boolean): Promise<import("./user.entity").User>;
}
