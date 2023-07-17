import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AssignResourcesToTicketInput {

    @Field(() => String)
    ticketId: string;

    @Field(() => [String])
    resourceIds: string[];

}
