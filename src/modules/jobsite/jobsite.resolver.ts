import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JobsiteService } from './jobsite.service';
import { Jobsite } from './entities/jobsite.entity';
import { CreateJobsiteInput } from './dto/create-jobsite.input';
import { UpdateJobsiteInput } from './dto/update-jobsite.input';

@Resolver(() => Jobsite)
export class JobsiteResolver {
  constructor(private readonly jobsiteService: JobsiteService) {}

  @Mutation(() => Jobsite)
  createJobsite(@Args('createJobsiteInput') createJobsiteInput: CreateJobsiteInput) {
    return this.jobsiteService.create(createJobsiteInput);
  }

  @Query(() => [Jobsite], { name: 'jobsite' })
  findAll() {
    return this.jobsiteService.findAll();
  }

  @Query(() => Jobsite, { name: 'jobsite' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.jobsiteService.findOne(id);
  }

  @Mutation(() => Jobsite)
  updateJobsite(@Args('updateJobsiteInput') updateJobsiteInput: UpdateJobsiteInput) {
    return this.jobsiteService.update(updateJobsiteInput.id, updateJobsiteInput);
  }

  @Mutation(() => Jobsite)
  removeJobsite(@Args('id', { type: () => Int }) id: number) {
    return this.jobsiteService.remove(id);
  }
}
