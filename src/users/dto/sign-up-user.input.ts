import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpUserInput {

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field({ nullable: true, defaultValue: null })
  phoneNumber?: string;
}
