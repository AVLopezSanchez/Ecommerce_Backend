import { UserDto } from 'src/Dtos/users.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { LoginDto } from 'src/Dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    registerUser(user: UserDto): Promise<Omit<User, 'isAdmin'>>;
    loginUser(credentials: LoginDto): Promise<string>;
}
