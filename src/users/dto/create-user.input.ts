import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../entities/role.entity';

@InputType()
export class CreateUserInput {

  @Field(() => String)
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field(() => UserRole)
  role: UserRole
}
