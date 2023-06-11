import { ObjectType, Field } from '@nestjs/graphql';
import { Ticket } from '../entities/ticket.entity';

@ObjectType()
export class GetAllTicketsPayload {
    @Field(()=>[Ticket])
    tickets: Ticket[];

    @Field()
    count: number;
}
