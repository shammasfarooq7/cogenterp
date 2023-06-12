import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateJobsiteInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
