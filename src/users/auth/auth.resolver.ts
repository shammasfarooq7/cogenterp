import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';
import { GqlAuthGuard } from './gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { SignUpUserInput } from '../dto/sign-up-user.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService){}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponse)
  async signin(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<LoginResponse>{
    return await this.authService.login(loginUserInput)
  }

  @Mutation(() => User)
  async signup(@Args('signUpUserInput') signUpUserInput: SignUpUserInput): Promise<User>{
    return await this.authService.signup(signUpUserInput);
  }
}
