import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetAllTicketsInput {

    @Field(() => Number, { nullable: true })
    page: number;

    @Field(() => Number, { nullable: true })
    limit: number;

    @Field(() => String, { nullable: true })
    searchQuery: string;

    @Field(() => Boolean, { nullable: true })
    external: string;

    @Field(() => String, { nullable: true })
    customerId: string;

    @Field(() => Boolean, { nullable: true })
    approved: string;
}
