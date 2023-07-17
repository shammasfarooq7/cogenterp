import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { CommonPayload } from './dto/common.dto';
import { Roles } from './roles.decorator';
import { UserRole } from './entities/role.entity';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { ICurrentUser } from './auth/interfaces/current-user.interface';
import { GetAllUsersInput } from './dto/get-all-users-input';
import { IContext } from './auth/interfaces/context.interface';
import { GetAllUsersStatsPayload } from './dto/get-all-users.dto';
import { ChangePasswordInput } from './dto/change-password.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => GetAllUsersStatsPayload)
  async getAllUsers(@CurrentUser() user: ICurrentUser, @Args('getAllUsersInput') getAllUsersInput: GetAllUsersInput): Promise<GetAllUsersStatsPayload> {
    return await this.usersService.getAllUsers(getAllUsersInput);
  }

  @Query(() => User)
  async getCurrentUser(@Context() ctx: IContext): Promise<User> {
    const result = await this.usersService.getCurrentUser(ctx?.user?.userId);
    return result;
  }

  @Mutation(() => User)
  async createuser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Roles(UserRole.ADMIN, UserRole.RMS, UserRole.CUSTOMER, UserRole.FEOPS, UserRole.RESOURCE, UserRole.SD)
  @Mutation(() => CommonPayload)
  async changePassword(@CurrentUser() user: ICurrentUser ,@Args('changePasswordInput') changePasswordInput: ChangePasswordInput): Promise<CommonPayload> {
    return await this.usersService.changePassword(user,changePasswordInput);
  }

}
