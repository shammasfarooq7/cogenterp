import { UserRole } from '../../../users/entities/role.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetAllJobsitesInput {

  @Field(() => Number, { nullable: true })
  page: number;

  @Field(() => Number, { nullable: true })
  limit: number;

  @Field(() => String, { nullable: true })
  searchQuery: string;
}
