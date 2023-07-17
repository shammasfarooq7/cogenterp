import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  accessToken?: string;

  @Field((type) => [String], { nullable: true })
  roles?: String[];
}
