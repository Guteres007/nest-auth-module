import { AuthService } from './auth.service';
export declare class AuthResolver {
    protected authService: AuthService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
}
