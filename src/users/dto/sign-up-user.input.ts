import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpUserInput {

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  middleName: string;
}
