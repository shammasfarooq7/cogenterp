import { CreateTicketInput } from './create-ticket.input';
import { InputType, Field, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateTicketInput extends OmitType(CreateTicketInput, ["customerId", "projectId","jobSiteId", "ticketType", "region", "projectCode", "siteName", "country", "city", "province", "postCode", "siteAddress"], InputType) {
  @Field(() => String)
  id: string;
}