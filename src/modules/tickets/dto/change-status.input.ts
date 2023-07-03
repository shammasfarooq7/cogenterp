import { Status } from '../entities/ticket.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChangeStatusInput {

  @Field(() => String)
  ticketId: string

  @Field(() => Status)
  status: Status

}
