import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../entities/role.entity';

@InputType()
export class CreateUserInput {

  @Field(() => String)
  email: string;

  @Field({ nullable: true, defaultValue: null })
  phoneNumber?: string;

  @Field(() => UserRole)
  role: UserRole
}
