import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateJobsiteInput {
  @Field(() => String, {nullable: false})
  projectId: string
}
