import { ObjectType, Field } from '@nestjs/graphql';
import { Jobsite } from '../entities/jobsite.entity';

@ObjectType()
export class GetAllJobsitesPayload {
    @Field(()=>[Jobsite])
    jobsites: Jobsite[];

    @Field()
    count: number;
}
