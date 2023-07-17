import { ObjectType, Field, OmitType } from '@nestjs/graphql';
import { Ticket } from '../entities/ticket.entity';

@ObjectType()
export class TicketWithPermissions extends OmitType(Ticket, ["generateDerivedId"]) {
    @Field()
    canEditAndDelete: boolean;
}

@ObjectType()
export class GetAllTicketsPayload {
    @Field(() => [TicketWithPermissions], { nullable: true })
    tickets: TicketWithPermissions[];

    @Field()
    count: number;
}
