import { CreateTicketInput } from './create-ticket.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTicketInput extends CreateTicketInput {
  @Field(() => String)
  id: String;
}
