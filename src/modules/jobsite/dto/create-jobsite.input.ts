import { InputType, Int, Field } from '@nestjs/graphql';
import { AgreedSla, Coverage, Currency, IncrementTime, ServiceCatItem, ServiceType, SupportType, TechnologyType } from '../entities/jobsite.entity';

@InputType()
export class CreateJobsiteInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  province: string;

  @Field(() => String)
  postcode: string;

  @Field(() => String)
  siteAddress: string;

  @Field(() => String)
  pocName: string;

  @Field(() => String)
  pocContactNumber: string;

  @Field(() => String)
  pocEmailAdrress: string;

  @Field(() => String)
  ppe1h: string;

  @Field(() => String)
  ppe2h: string;

  @Field(() => String)
  ppe3h: string;

  @Field(() => String)
  ppe4h: string;

  @Field(() => String)
  ppe5h: string;

  @Field(() => String)
  ppe6h: string;

  @Field(() => String)
  ppe7h: string;

  @Field(() => String)
  ppe8h: string;

  @Field(() => String)
  tandm30: string;

  @Field(() => String)
  tandm1h: string;

  @Field(() => String)
  afth: string;

  @Field(() => String)
  wknd: string;

  @Field(() => String)
  ph: string;

  @Field(() => Boolean)
  sat: boolean;

  @Field(() => Boolean)
  sun: boolean;

  @Field(() => String)
  siteTiming: string;

  @Field(() => String)
  timeZone: string;

  @Field(() => Number)
  dispatchAgreed: number;

  @Field(() => IncrementTime)
  incrementTime: IncrementTime;

  @Field(() => [ServiceType])
  serviceType: ServiceType[];

  @Field(() => [SupportType])
  supportType: SupportType[];

  @Field(() => [ServiceCatItem])
  serviceCatItem: ServiceCatItem[];

  @Field(() => [AgreedSla])
  agreedSla: AgreedSla[];

  @Field(() => [Coverage])
  coverage: Coverage[];

  @Field(() => [TechnologyType])
  technologyType: TechnologyType[];

  @Field(() => [Currency])
  currency: Currency[];

  @Field(() => String)
  projectId: string;
}
