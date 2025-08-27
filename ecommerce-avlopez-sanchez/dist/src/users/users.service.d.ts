import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    getUsers(page: number, limit: number): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    changeUserRole(userId: string, role: boolean): Promise<User>;
}
