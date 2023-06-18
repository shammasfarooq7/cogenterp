import { InputType, Int, Field } from '@nestjs/graphql';
import { AgreedSla, Coverage, IncrementTime, ServiceType, SowDesc, Status, SupportModel, TalentLevel, TechnologyType } from '../entities/project.entity';

@InputType()
export class CreateProjectInput {

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => String, { nullable: false })
  customerId: string;

  @Field((type) => Status)
  status: Status;

  @Field(() => String)
  name: string;

  @Field(() => String)
  clientPartnerName: string;

  @Field(() => String)
  custSdmName: string;

  @Field(() => String)
  custSdmEmail: string;

  @Field(() => String)
  custSdmContNum: string;

  @Field(() => String)
  cogSdmName: string;

  @Field(() => String)
  cogSdmNum: string;

  @Field(() => String)
  cogSdmCont: string;

  @Field(() => String)
  cogSdEmail: string;

  @Field(() => String)
  cogSdContNum: string;

  @Field(() => AgreedSla)
  agreedSla: AgreedSla[];

  @Field(() => Coverage)
  coverage: Coverage[];

  @Field(() => TechnologyType)
  technologyType: TechnologyType[];

  @Field(() => ServiceType)
  serviceType: ServiceType[];

  @Field(() => SupportModel)
  supportModel: SupportModel[];

  @Field(() => TalentLevel)
  talentLevel: TalentLevel[];

  @Field(() => String, {nullable: true})
  cancelPolicy: string;

  @Field(() => Number)
  dispatchAgreed: number

  @Field(() => IncrementTime)
  incrementTime: IncrementTime;

  @Field(() => String, {nullable: true})
  sow: string;

  @Field(() => SowDesc)
  sowDesc: SowDesc;

  @Field(() => String, {nullable: true})
  owJd: string;

  @Field(() => String, {nullable: true})
  serviceDeliv: string;

  @Field(() => String, {nullable: true})
  ssInst: string;

  @Field(() => String, {nullable: true})
  asInst: string;

  @Field(() => String, {nullable: true})
  toolsReq: string;

  @Field()
  namedWorker: boolean;

  @Field(() => String, {nullable: true})
  assignedWorker: string;

  @Field(() => String, {nullable: true})
  technicalSkill: string;

  @Field(() => String, {nullable: true})
  behSkills: string;

  @Field(() => String, {nullable: true})
  experienceReq: string;

  @Field(() => String, {nullable: true})
  langReq: string;

  @Field(() => String, {nullable: true})
  trainReq: string;

  @Field(() => String, {nullable: true})
  trainDoc: string;

  @Field(() => String, {nullable: true})
  reqTools: string;

  @Field(() => String, {nullable: true})
  reqSoft: string;

  @Field(() => String, {nullable: true})
  specReq: string;

  @Field(() => String, {nullable: true})
  cl1ee: string;

  @Field(() => String, {nullable: true})
  cl1ec: string;

  @Field(() => String, {nullable: true})
  cl2ee: string;

  @Field(() => String, {nullable: true})
  cl2ec: string;

  @Field(() => String, {nullable: true})
  cgl1ee: string;

  @Field(() => String, {nullable: true})
  cgl1ec: string;

  @Field(() => String, {nullable: true})
  cfl2ee: string;

  @Field(() => String, {nullable: true})
  cgl2ec: string;
}
