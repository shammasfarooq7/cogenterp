import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CommonPayload {
    @Field(() => String)
    message: string;
}
