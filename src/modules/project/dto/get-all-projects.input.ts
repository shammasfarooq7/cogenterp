import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetAllProjectsInput {

    @Field(() => Number, { nullable: true })
    page: number;

    @Field(() => Number, { nullable: true })
    limit: number;

    @Field(() => String, { nullable: true })
    searchQuery: string;
}
