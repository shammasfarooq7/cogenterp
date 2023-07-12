import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetTodayTicketsInput {

    @Field(() => Number, { nullable: true })
    page: number;

    @Field(() => Number, { nullable: true })
    limit: number;

    @Field(() => String, { nullable: true })
    searchQuery: string;

    @Field(() => String, { nullable: true })
    customerId: string;
}
