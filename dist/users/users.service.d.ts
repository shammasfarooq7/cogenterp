import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(createUserInput: CreateUserInput): Promise<{
        email: string;
        password: string;
        phoneNumber?: string;
    } & User>;
    getAllUsers(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, updateUserInput: UpdateUserInput): string;
    remove(id: number): string;
}
