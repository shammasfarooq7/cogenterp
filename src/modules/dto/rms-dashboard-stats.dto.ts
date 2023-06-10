import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RMSDashboardStatsPayload {
    @Field(() => Number)
    totalResourceCount: number;

    @Field(() => Number)
    newRequestCount: number;

    @Field(() => Number)
    newHiringCount: number;

}
