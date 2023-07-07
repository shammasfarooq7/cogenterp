import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobsiteService } from './jobsite.service';
import { Jobsite } from './entities/jobsite.entity';
import { CreateJobsiteInput } from './dto/create-jobsite.input';
import { UpdateJobsiteInput } from './dto/update-jobsite.input';
import { Roles } from 'src/users/roles.decorator';
import { UserRole } from 'src/users/entities/role.entity';
import { CommonPayload } from 'src/users/dto/common.dto';
import { GetAllJobsitesInput } from './dto/get-all-jobsites.input';
import { GetAllJobsitesPayload } from './dto/get-all-jobsites.dto';

@Resolver(() => Jobsite)
export class JobsiteResolver {
  constructor(private readonly jobsiteService: JobsiteService) { }

  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async createJobsite(@Args('createJobsiteInput') createJobsite: CreateJobsiteInput): Promise<CommonPayload> {
    return await this.jobsiteService.createJobsite(createJobsite)
  }

  @Roles(UserRole.ADMIN)
  @Query(() => Jobsite)
  async getJobsite(@Args('id') id: string): Promise<Jobsite> {
    return await this.jobsiteService.getJobsite(id);
  }

  @Roles(UserRole.ADMIN, UserRole.SD)
  @Query(() => [Jobsite])
  async getJobsitesByProject(@Args('id') id: string): Promise<Jobsite[]> {
    return await this.jobsiteService.getJobsitesByProject(id);
  }

  @Roles(UserRole.ADMIN)
  @Query(() => [GetAllJobsitesPayload])
  async getAllJobsites(@Args('getAllJobsitesInput') getAllJobsitesInput: GetAllJobsitesInput): Promise<GetAllJobsitesPayload> {
    return await this.jobsiteService.getAllJobsites(getAllJobsitesInput);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async updateJobsite(@Args('id') id: string, @Args('updateJobsiteInput') updateJobsiteInput: UpdateJobsiteInput): Promise<CommonPayload> {
    return await this.jobsiteService.updateJobsite(id, updateJobsiteInput);
  }

  @Roles(UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  async deleteJobsite(@Args('id') id: string): Promise<CommonPayload> {
    return await this.jobsiteService.deleteJobsite(id)
  }
}
