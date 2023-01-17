import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field({ nullable: true, defaultValue: null })
  phoneNumber?: string;
}
