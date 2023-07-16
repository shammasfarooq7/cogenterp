import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CommonPayload } from '../../users/dto/common.dto';
import { Roles } from '../../users/roles.decorator';
import { UserRole } from '../../users/entities/role.entity';
import { CurrentUser } from '../../users/auth/decorators/current-user.decorator';
import { ICurrentUser } from '../../users/auth/interfaces/current-user.interface';
import { IContext } from '../../users/auth/interfaces/context.interface';
import { Resource } from './entity/resource.entity';
import { ResourcesService } from './resources.service';
import { CreateResourceInput } from './dto/create-resource-input';
import { GetAllResourcesStatsPayload } from './dto/get-all-resources.dto';
import { GetAllResourcesInput } from './dto/get-all-resources-input';
import { UpdateResourceInput } from './dto/update-resource-input';
import { RMSDashboardStatsPayload } from './dto/rms-dashboard-stats.dto';
import { ResourceDashboardStatsPayload } from './dto/resource-dashboard-stats.dto';
import { CheckinCheckoutInput } from './dto/checkin-checkout.input';
import { GetResourceTicketInput } from './dto/get-resource-ticket.input';
import { GetResourceTicketPayload } from './dto/get-resource-ticket.dto';

@Resolver(() => Resource)
export class ResourcesResolver {
  constructor(private readonly resourcesService: ResourcesService) { }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => GetAllResourcesStatsPayload)
  async getAllResources(@CurrentUser() user: ICurrentUser, @Args('getAllResourcesInput') getAllResourcesInput: GetAllResourcesInput): Promise<GetAllResourcesStatsPayload> {
    return await this.resourcesService.getAllResources(getAllResourcesInput);
  }

  @Roles(UserRole.ADMIN, UserRole.RMS, UserRole.RESOURCE)
  @Query(() => Resource)
  async getResource(@Context() ctx: IContext, @Args('id', { nullable: true, defaultValue: null }) id: string | null): Promise<Resource> {
    if (id) { return await this.resourcesService.getResource(id) }
    return await this.resourcesService.getResourceFromUserId(ctx?.user?.userId);
  }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => RMSDashboardStatsPayload)
  async getRMSDashboardStats(): Promise<RMSDashboardStatsPayload> {
    return await this.resourcesService.getRMSDashboardStats();
  }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => ResourceDashboardStatsPayload)
  async getResourceDashboardStats(): Promise<ResourceDashboardStatsPayload> {
    return await this.resourcesService.getResourceDashboardStats();
  }


  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Mutation(() => CommonPayload)
  async createResource(@Args('createResourceInput') createResourceInput: CreateResourceInput, @Context() ctx: IContext): Promise<CommonPayload> {
    return await this.resourcesService.createResource(ctx?.user?.userId, createResourceInput)
  }

  @Roles(UserRole.ADMIN, UserRole.RMS, UserRole.RESOURCE)
  @Mutation(() => CommonPayload)
  async updateResource(@Args('id') id: string, @Args('updateResourceInput') updateResourceInput: UpdateResourceInput, @Context() ctx: IContext): Promise<CommonPayload> {
    return await this.resourcesService.updateResource(ctx?.user?.userId, id, updateResourceInput);
  }

  // @Roles(UserRole.ADMIN, UserRole.RMS)
  // @Mutation(() => CommonPayload)
  // async deleteResource(@Args('id') id: string): Promise<CommonPayload> {
  //   return await this.usersService.deleteResource(id)
  // }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Mutation(() => CommonPayload)
  async approveUserRequest(@Args('id') id: string): Promise<CommonPayload> {
    return await this.resourcesService.approveUserRequest(id)
  }

  @Roles(UserRole.ADMIN, UserRole.RMS)
  @Query(() => GetAllResourcesStatsPayload)
  async getNewRequestUsers(@Args('getNewRequestUsersInput') getNewRequestUsersInput: GetAllResourcesInput): Promise<GetAllResourcesStatsPayload> {
    return await this.resourcesService.getNewRequestUsers(getNewRequestUsersInput);
  }

  @Roles(UserRole.ADMIN, UserRole.RESOURCE)
  @Query(() => GetResourceTicketPayload)
  async getResourceTickets(@Context() ctx: IContext, @Args('getResourceTicketInput') getResourceTicketInput: GetResourceTicketInput): Promise<GetResourceTicketPayload>{
    return await this.resourcesService.getResourceTickets(ctx, getResourceTicketInput);
  }

  @Roles(UserRole.RESOURCE, UserRole.FEOPS, UserRole.SD)
  @Mutation(() => CommonPayload)
  async timeSheetCheckInOut(@Context() ctx: IContext, @Args('checkinCheckoutInput') checkinCheckoutInput: CheckinCheckoutInput): Promise<CommonPayload>{
    return await this.resourcesService.timeSheetCheckInOut(ctx?.user, checkinCheckoutInput)
  }
}
