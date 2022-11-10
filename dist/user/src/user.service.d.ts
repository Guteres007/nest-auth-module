import { CreateUserInput } from '@app/user/dto/create-user.input';
import { UpdateUserInput } from '@app/user/dto/update-user.input';
import { Model } from 'mongoose';
import { User, UserDocument } from '@app/user/entities/user.entity';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserInput: UpdateUserInput): void;
    remove(id: string): void;
}
