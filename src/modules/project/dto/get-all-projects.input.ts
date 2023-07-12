import { UserRole } from '../../../users/entities/role.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetAllProjectsInput {

    @Field(() => UserRole, { nullable: true })
    role: UserRole;

    @Field(() => Number, { nullable: true })
    page: number;

    @Field(() => Number, { nullable: true })
    limit: number;

    @Field(() => String, { nullable: true })
    searchQuery: string;

    @Field(() => String, { nullable: true })
    customerId: string;
}
