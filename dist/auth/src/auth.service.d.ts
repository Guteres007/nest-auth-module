import { UserService } from '../../user/src/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/src/entities/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    createToken(user: User): Promise<{
        accessToken: string;
    }>;
}
