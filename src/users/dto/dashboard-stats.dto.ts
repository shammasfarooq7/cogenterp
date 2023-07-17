import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DashboardStatsPayload {
    @Field(() => Number)
    totalResourceCount: number;

    @Field(() => Number)
    newRequestCount: number;

    @Field(() => Number)
    newHiringCount: number;

}
