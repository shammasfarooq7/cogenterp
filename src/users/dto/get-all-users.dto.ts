import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class GetAllUsersStatsPayload {
    @Field(()=>[User])
    users: User[];

    @Field()
    count: number;
}
