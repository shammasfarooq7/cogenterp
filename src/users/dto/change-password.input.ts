import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from '@nestjs/class-validator';

@InputType()
export class ChangePasswordInput {

  @Field(() => String)
  oldPass: string;

  @Field(() => String)
  newPass: string;
}
