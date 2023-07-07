import { InputType, Int, Field } from '@nestjs/graphql';
import { Region, ServiceLevel, ServicePriority, SlaPriority, TechnologyType } from '../entities/ticketDetail.entity';
import { TicketType } from '../entities/ticket.entity';

@InputType()
export class CreateTicketInput {

  @Field(() => String)
  customerId: string;

  @Field(() => String, { nullable: true })
  projectId: string;

  @Field(() => String, { nullable: true })
  jobSiteId: string;

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
  scheduledTime: string

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

  @Field(() => String)
  projectCode: string;

  @Field(() => String)
  siteName: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  province: string;

  @Field(() => String)
  postCode: string;

  @Field(() => String)
  siteAddress: string;

  @Field(() => [String], {nullable: true})
  attachments?: string[]
}
