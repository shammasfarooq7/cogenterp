import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetProjectsByCustomerInput {

    @Field(() => String, { nullable: true })
    projectId: string;

    @Field(() => Number, { nullable: true })
    page: number;

    @Field(() => Number, { nullable: true })
    limit: number;

}
