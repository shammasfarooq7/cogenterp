import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    signin(loginUserInput: LoginUserInput): Promise<LoginResponse>;
    signup(createUserInput: CreateUserInput): Promise<User>;
}
