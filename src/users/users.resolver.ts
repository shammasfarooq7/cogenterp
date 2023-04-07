import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Roles(UserRole.ADMIN)
  @Query(() => [User])
  async getAllUsers(@CurrentUser() user: ICurrentUser): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Roles(UserRole.ADMIN)
  @Query(() => User)
  async getResource(@Args('id') id: string): Promise<User> {
    return await this.usersService.getResource(id);
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
  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async createResource(@Args('createResourceInput') createResourceInput: CreateResourceInput): Promise<CommonPayload> {
    return await this.usersService.createResource(createResourceInput)
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async deleteResource(@Args('id') id: string): Promise<CommonPayload> {
    return await this.usersService.deleteResource(id)
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.usersService.remove(id);
  }
}
