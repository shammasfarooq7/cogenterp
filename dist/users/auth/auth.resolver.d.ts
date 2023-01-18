import { AuthService } from './auth.service';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(loginUserInput: LoginUserInput, context: any): Promise<LoginResponse>;
    signup(createUserInput: CreateUserInput): Promise<{
        email: string;
        password: string;
        phoneNumber?: string;
    } & User>;
}
