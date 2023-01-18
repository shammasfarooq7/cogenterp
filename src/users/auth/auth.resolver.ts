import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from '../dto/login-response';
import { LoginUserInput } from '../dto/login-user-input';
import { GqlAuthGuard } from './gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService){}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context): Promise<LoginResponse>{
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('createUserInput') createUserInput: CreateUserInput){
    return this.authService.signup(createUserInput);
  }
}
