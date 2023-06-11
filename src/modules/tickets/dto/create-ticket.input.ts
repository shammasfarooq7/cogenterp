import { InputType, Int, Field } from '@nestjs/graphql';
import { Region, ServiceLevel, ServicePriority, SlaPriority, TechnologyType } from '../entities/ticketDetail.entity';
import { TicketType } from '../entities/ticket.entity';

@InputType()
export class CreateTicketInput {

  @Field(() => TicketType)
  ticketType: TicketType;

  @Field(() => String)
  numberOfHoursReq: string;

  @Field(() => String)
  numberOfResource: string;

  @Field(() => String)
  accountName: string;

  @Field(() => String)
  endClientName: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  provinceState: string;

  @Field(() => String)
  siteAddress: string;

  @Field(() => String)
  postCode: string;

  @Field(() => String)
  spocName: string;

  @Field(() => String)
  spocContactNumber: string;

  @Field(() => String)
  spocEmailAddress: string;

  @Field(() => String)
  siteAccessInstruction: string;

  @Field(() => String)
  customerCaseNumber: string;

  @Field(() => String)
  jobSummary: string;

  @Field(() => String)
  caseDetails: string;

  @Field(() => String)
  scopeOfWork: string;

  @Field(() => String)
  instructions: string;

  @Field(() => String)
  addInstruction: string;

  @Field(() => String)
  specialInstruction: string;

  @Field(() => String)
  hardwareSN: string;

  @Field(() => [String], { nullable: true })
  toolsRequested?: string[];

  @Field(() => TechnologyType, { nullable: true })
  technologyType?: TechnologyType;

  @Field(() => Region, { nullable: true })
  region?: Region;

  @Field(() => [String], { nullable: true })
  serviceType?: string[];

  @Field(() => ServiceLevel)
  serviceLevel: ServiceLevel;

  @Field(() => ServicePriority)
  servicePriority: ServicePriority;

  @Field(() => SlaPriority)
  slaPriority: SlaPriority;

  @Field({ nullable: true })
  serviceDocUrl?: string;

  @Field(() => [Date])
  ticketDates: Date[]
}
