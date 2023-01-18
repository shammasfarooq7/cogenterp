import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../dto/create-user.input';
import { LoginResponse } from '../dto/login-response';
export declare class AuthService {
    private userRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<{
        id: string;
        email: string;
        phoneNumber: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: User): Promise<LoginResponse>;
    signup(createUserInput: CreateUserInput): Promise<{
        email: string;
        password: string;
        phoneNumber?: string;
    } & User>;
}
