import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  accessToken?: string;
}
