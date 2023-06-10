import { ObjectType, Field } from '@nestjs/graphql';
import { Resource } from '../resources/entity/resource.entity';

@ObjectType()
export class GetAllResourcesStatsPayload {
    @Field(()=>[Resource])
    resources: Resource[];

    @Field()
    count: number;
}
