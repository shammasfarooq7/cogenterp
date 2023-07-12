import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetResourceTicketInput {

  @Field(() => String, {nullable: true})
  resourceId: string;

  @Field(() => Boolean, {nullable: true})
  today: boolean;

  @Field(() => Boolean, {nullable: true})
  future: boolean;

  @Field(() => Number, { nullable: true })
  page: number;

  @Field(() => Number, { nullable: true })
  limit: number;

}
