import { ObjectType, Field } from '@nestjs/graphql';
import { Ticket } from '../entities/ticket.entity';

@ObjectType()
export class GetCustomerTicketDashboardStatsPayload {
    @Field(() => Number)
    projectCount: number;

    @Field(() => Number)
    futureCount: number;

    @Field(() => Number)
    inProgressCount: number;

}
