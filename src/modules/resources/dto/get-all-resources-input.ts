import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../../userRoles/entity/userRole.entity';
// import { EngagementType, UserStatus } from '../entities/user.entity';

@InputType()
export class GetAllResourcesInput {

    @Field(() => Number, { nullable: true })
    page: number;

    @Field(() => Number, { nullable: true })
    limit: number;

    @Field(() => String, { nullable: true })
    searchQuery: string;
}
