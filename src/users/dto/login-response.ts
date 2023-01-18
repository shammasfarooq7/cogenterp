import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

ObjectType()
export class LoginResponse{
  @Field({nullable: true})
  access_token?: string;
}