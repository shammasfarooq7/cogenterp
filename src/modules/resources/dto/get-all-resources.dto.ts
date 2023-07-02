import { ObjectType, Field } from '@nestjs/graphql';
import { Resource } from '../entity/resource.entity';

@ObjectType()
export class GetAllResourcesStatsPayload {
    @Field(()=>[Resource])
    resources: Resource[];

    @Field()
    count: number;
}
