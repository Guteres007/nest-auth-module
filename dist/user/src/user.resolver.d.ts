import { UserService } from '@app/user/user.service';
import { User } from '@app/user/entities/user.entity';
import { CreateUserInput } from '@app/user/dto/create-user.input';
import { UpdateUserInput } from '@app/user/dto/update-user.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createAuthInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    updateAuth(updateAuthInput: UpdateUserInput): void;
    removeUser(id: string): void;
}
