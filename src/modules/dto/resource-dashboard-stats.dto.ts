import { ObjectType, Field } from '@nestjs/graphql';


@ObjectType()
class Stats {
    @Field(() => Number)
    total: number;

    @Field(() => Number)
    difference: number;
}

@ObjectType()
export class ResourceDashboardStatsPayload {
    @Field()
    resourceStats: Stats;

    @Field()
    onboardedStats: Stats;
}
