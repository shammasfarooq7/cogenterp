import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateResourcePayload {
    @Field(() => String)
    message: string;
}
