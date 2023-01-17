import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

ObjectType()
export class LoginResponse{
  @Field()
  access_token: string;

  @Field(() => User)
  user: User
}