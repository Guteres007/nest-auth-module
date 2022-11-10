import { UserService } from '@app/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/user/entities/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    createToken(user: User): Promise<{
        accessToken: string;
    }>;
}
