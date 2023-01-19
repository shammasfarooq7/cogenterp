import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService){}

  // @UseGuards(GqlAuthGuard)
  // @Mutation(() => LoginResponse)
  // async login(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<LoginResponse>{
  //   return await this.authService.login(loginUserInput);
  // }

  @Mutation(() => LoginResponse)
  async signin(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<LoginResponse>{
    return await this.authService.login(loginUserInput)
  }

  @Mutation(() => User)
  async signup(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User>{
    return await this.authService.signup(createUserInput);
  }
}
