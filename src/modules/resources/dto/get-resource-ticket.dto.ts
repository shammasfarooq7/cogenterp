import { ObjectType, Field } from '@nestjs/graphql';
import { TicketDate } from '@app/modules/tickets/entities/ticketDate.entity';

@ObjectType()
export class GetResourceTicketPayload {
    @Field(() => [TicketDate], { nullable: true })
    ticketDates: TicketDate[];

    @Field({ nullable: true })
    count: number;
}
