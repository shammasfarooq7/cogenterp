import { ObjectType, Field } from '@nestjs/graphql';
import { Ticket } from '../entities/ticket.entity';

@ObjectType()
export class GetTicketDashboardStatsPayload {
    @Field(() => Number)
    todayCount: number;

    @Field(() => Number)
    futureCount: number;

    @Field(() => Number)
    inProgressCount: number;

}
