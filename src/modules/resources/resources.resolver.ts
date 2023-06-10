import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CommonPayload } from '../../users/dto/common.dto';
import { Roles } from '../../users/roles.decorator';
import { UserRole } from '../../users/entities/role.entity';
import { CurrentUser } from '../../users/auth/decorators/current-user.decorator';
import { ICurrentUser } from '../../users/auth/interfaces/current-user.interface';
import { IContext } from '../../users/auth/interfaces/context.interface';
import { Resource } from 'src/modules/resources/entity/resource.entity';
import { ResourcesService } from './resources.service';
import { CreateResourceInput } from '../dto/create-resource-input';
import { GetAllResourcesStatsPayload } from '../dto/get-all-resources.dto';
import { GetAllResourcesInput } from '../dto/get-all-resources-input';

@Resolver(() => Resource)
export class ResourcesResolver {
  constructor(private readonly resourcesService: ResourcesService) { }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => GetAllResourcesStatsPayload)
  async getAllResources(@CurrentUser() user: ICurrentUser, @Args('getAllResourcesInput') getAllResourcesInput: GetAllResourcesInput): Promise<GetAllResourcesStatsPayload> {
    return await this.resourcesService.getAllResources(getAllResourcesInput);
  }

  // @Roles(UserRole.ADMIN, UserRole.RMS, UserRole.RESOURCE)
  // @Query(() => Resource)
  // async getResource(@Context() ctx: IContext, @Args('id', { nullable: true, defaultValue: null }) id: string | null): Promise<Resource> {
  //   return await this.usersService.getResource(id || ctx?.user?.userId);
  // }

  // @Roles(UserRole.ADMIN, UserRole.RMS)
  // @Query(() => DashboardStatsPayload)
  // async getDashboardStats(): Promise<DashboardStatsPayload> {
  //   return await this.usersService.getDashboardStats();
  // }

  // @Roles(UserRole.ADMIN, UserRole.RMS)
  // @Query(() => ResourceDashboardStatsPayload)
  // async getResourceDashboardStats(): Promise<ResourceDashboardStatsPayload> {
  //   return await this.usersService.getResourceDashboardStats();
  // }


  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Mutation(() => CommonPayload)
  async createResource(@Args('createResourceInput') createResourceInput: CreateResourceInput, @Context() ctx: IContext): Promise<CommonPayload> {
    return await this.resourcesService.createResource(ctx?.user?.userId, createResourceInput)
  }

  // @Roles(UserRole.ADMIN, UserRole.RMS, UserRole.RESOURCE)
  // @Mutation(() => CommonPayload)
  // async updateResource(@Args('id') id: string, @Args('updateResourceInput') updateResourceInput: UpdateResourceInput, @Context() ctx: IContext): Promise<CommonPayload> {
  //   return await this.usersService.updateResource(ctx?.user?.userId, id, updateResourceInput);
  // }

  // @Roles(UserRole.ADMIN, UserRole.RMS)
  // @Mutation(() => CommonPayload)
  // async deleteResource(@Args('id') id: string): Promise<CommonPayload> {
  //   return await this.usersService.deleteResource(id)
  // }

  // @Roles(UserRole.ADMIN, UserRole.RMS)
  // @Mutation(() => CommonPayload)
  // async approveUserRequest(@Args('id') id: string): Promise<CommonPayload> {
  //   return await this.usersService.approveUserRequest(id)
  // }

  // // @Roles(UserRole.ADMIN, UserRole.RMS)
  // @Query(() => GetAllUsersStatsPayload)
  // async getNewRequestUsers(@Args('getNewRequestUsersInput') getNewRequestUsersInput: GetAllUsersInput): Promise<GetAllUsersStatsPayload> {
  //   return await this.usersService.getNewRequestUsers(getNewRequestUsersInput);
  // }
}
