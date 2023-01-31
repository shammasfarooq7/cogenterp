import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';
import { GqlAuthGuard } from './gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService){}

  @Mutation(() => LoginResponse)
  async signin(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<LoginResponse> {
    return await this.authService.login(loginUserInput)
  }

  @Mutation(() => User)
  async signup(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.authService.signup(createUserInput);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getLoggedInUser(@CurrentUser() user: User,): Promise<User> {
    return user;
  }
}
