import { ObjectType, Field } from '@nestjs/graphql';
import { TicketDate } from '../entities/ticketDate.entity';

@ObjectType()
export class GetTodayTicketsPayload {
    @Field(() => [TicketDate])
    ticketDates: TicketDate[];

    @Field()
    count: number;
}
