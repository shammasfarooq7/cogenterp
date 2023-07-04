import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../entities/role.entity';
import { IsEmail } from '@nestjs/class-validator';

@InputType()
export class CreateUserInput {

  @Field(() => String)
  @IsEmail()
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
