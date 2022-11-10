import { AuthService } from '@app/auth/auth.service';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
}
