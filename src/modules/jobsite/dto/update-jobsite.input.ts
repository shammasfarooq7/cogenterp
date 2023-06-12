import { CreateJobsiteInput } from './create-jobsite.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJobsiteInput extends PartialType(CreateJobsiteInput) {
  @Field(() => Int)
  id: number;
}
