import { ObjectType, Field } from '@nestjs/graphql';
import { Project } from '../entities/project.entity';

@ObjectType()
export class GetAllProjectsPayload {
    @Field(()=>[Project])
    projects: Project[];

    @Field()
    count: number;
}
