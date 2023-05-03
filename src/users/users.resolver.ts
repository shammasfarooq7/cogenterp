import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateResourceInput } from './dto/create-resource-input';
import { CommonPayload } from './dto/common.dto';
import { Roles } from './roles.decorator';
import { UserRole } from './entities/role.entity';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { ICurrentUser } from './auth/interfaces/current-user.interface';
import { UpdateResourceInput } from './dto/update-resource-input';
import { GetAllUsersInput } from './dto/get-all-users-input';
import { DashboardStatsPayload } from './dto/dashboard-stats.dto';
import { ResourceDashboardStatsPayload } from './dto/resource-dashboard-stats.dto';
import { IContext } from './auth/interfaces/context.interface';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => [User])
  async getAllUsers(@CurrentUser() user: ICurrentUser, @Args('getAllUsersInput') getAllUsersInput: GetAllUsersInput): Promise<User[]> {
    return await this.usersService.getAllUsers(getAllUsersInput);
  }

  @Query(() => User)
  async getCurrentUser(@Context() ctx: IContext): Promise<User> {
    const result = await this.usersService.getCurrentUser(ctx?.user?.userId);
    return result;
  }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => User)
  async getResource(@Args('id') id: string): Promise<User> {
    return await this.usersService.getResource(id);
  }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => DashboardStatsPayload)
  async getDashboardStats(): Promise<DashboardStatsPayload> {
    return await this.usersService.getDashboardStats();
  }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => ResourceDashboardStatsPayload)
  async getResourceDashboardStats(): Promise<ResourceDashboardStatsPayload> {
    return await this.usersService.getResourceDashboardStats();
  }


  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  async createuser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Mutation(() => CommonPayload)
  async createResource(@Args('createResourceInput') createResourceInput: CreateResourceInput): Promise<CommonPayload> {
    return await this.usersService.createResource(createResourceInput)
  }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Mutation(() => CommonPayload)
  async updateResource(@Args('id') id: string, @Args('updateResourceInput') updateResourceInput: UpdateResourceInput): Promise<CommonPayload> {
    return await this.usersService.updateResource(id, updateResourceInput);
  }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Mutation(() => CommonPayload)
  async deleteResource(@Args('id') id: string): Promise<CommonPayload> {
    return await this.usersService.deleteResource(id)
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.usersService.remove(id);
  }
}
