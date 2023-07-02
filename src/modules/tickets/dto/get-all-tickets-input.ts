import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetAllTicketsInput {

    @Field(() => Number, { nullable: true })
    page: number;

    @Field(() => Number, { nullable: true })
    limit: number;

}
