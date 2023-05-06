import { InputType, Field } from '@nestjs/graphql';
// import { EngagementType, UserStatus } from '../entities/user.entity';
import { UserRole } from "./../entities/role.entity"

@InputType()
export class GetAllUsersInput {
    @Field(() => UserRole, { nullable: true })
    role: UserRole;

    @Field(() => Number, { nullable: true })
    page: number;

    @Field(() => Number, { nullable: true })
    limit: number;

    @Field(() => String, { nullable: true })
    searchQuery: string;
}
