import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Jobsite } from '../../jobsite/entities/jobsite.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Max, Min } from '@nestjs/class-validator';

export enum Status {
  Planning = "planning",
  Signed = "signed",
  Approved = "approved",
  Live = "live"
}

registerEnumType(Status, {
  name: 'Status',
  description: 'status',
});

export enum IncrementTime {
  FIFTEEN = "15",
  THIRTY = "30",
  SIXTY = "60",
  hund20 = "120"
}

registerEnumType(IncrementTime, {
  name: 'IncrementTime',
  description: 'IncrementTime',
});

export enum TalentLevel {
  L0 = "L0",
  L1 = "L1",
  L2 = "L2",
  L3 = "L3"
}

registerEnumType(TalentLevel, {
  name: 'TalentLevel',
  description: 'TalentLevel',
});

export enum SupportModel {
  FTE_WBF = "FTE-WBF",
  FTE_NBF = "FTE-NBF",
  FSE = "FSE",
  PTE_WBF = "PTE-WBF",
  PTE_NBF = "PTE-NBF"
}

registerEnumType(SupportModel, {
  name: 'SupportModel',
  description: 'SupportModel',
});

export enum ServiceType {
  BREAKFIX = "BREAKFIX",
  IMAC = "IMAC",
  CABLING = "CABLING",
  HandF = "H&F",
  TRAINING = "TRAINING",
  DSS = "DSS"
}

registerEnumType(ServiceType, {
  name: 'ServiceType',
  description: 'ServiceType',
});

export enum SowDesc {
  BREAKFIX = "BREAKFIX",
  IMAC = "IMAC",
  CABLING = "CABLING",
  HandF = "H&F",
  TRAINING = "TRAINING",
  DSS = "DSS"
}

registerEnumType(SowDesc, {
  name: 'SowDesc',
  description: 'SowDesc',
});

export enum AgreedSla {
  SBD4H = "SBD4H",
  SBD2H = "SBD2H",
  SBD = "SBD",
  NBD = "NBD",
  twoBD = "2BD",
  threeBD = "3BD",
  fiveBD = "5BD",
  tenBD = "10BD"
}

registerEnumType(AgreedSla, {
  name: 'AgreedSla',
  description: 'Agreed SLA',
});

export enum Coverage {
  fiveD9H = "5D9H",
  t4X7AFTH = "24X7AFTH",
  t4X7WKND = "24X7WKND",
  t4X7HLDY = "24X7HLDY"
}

registerEnumType(Coverage, {
  name: 'Coverage',
  description: 'coverage',
});

export enum TechnologyType {
  EUC = "EUC",
  NETWORK = "NETWORK",
  LINUX = "LINUX",
  MAC = "MAC"
}

registerEnumType(TechnologyType, {
  name: 'TechnologyTypeForProject',
  description: 'technology type',
});
@ObjectType()
@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column({ type: 'timestamptz' })
  @Field(() => Date)
  startDate: Date;

  @Column({ type: 'timestamptz' })
  @Field(() => Date)
  endDate: Date;

  @Column({
    type: 'enum',
    enum: Status,
  })
  @Field((type) => Status)
  status: Status;

  @Column({ nullable: true })
  @Field(() => String)
  projectNumber: string;

  @BeforeInsert()
  generateDerivedId() {
    this.projectNumber = `${this.id}`;
  }

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  clientPartnerName: string;

  @Column()
  @Field(() => String)
  custSdmName: string;

  @Column()
  @Field(() => String)
  custSdmEmail: string;

  @Column()
  @Field(() => String)
  custSdmContNum: string;

  @Column()
  @Field(() => String)
  cogSdmName: string;

  @Column()
  @Field(() => String)
  cogSdmNum: string;

  @Column()
  @Field(() => String)
  cogSdmCont: string;

  @Column()
  @Field(() => String)
  cogSdEmail: string;

  @Column()
  @Field(() => String)
  cogSdContNum: string;

  @Column({
    type: 'enum',
    enum: AgreedSla,
    array: true
  })
  @Field(() => AgreedSla)
  agreedSla: AgreedSla[];

  @Column({
    type: 'enum',
    enum: Coverage,
    array: true
  })
  @Field(() => Coverage)
  coverage: Coverage[];

  @Column({
    type: 'enum',
    enum: TechnologyType,
    array: true
  })
  @Field(() => TechnologyType)
  technologyType: TechnologyType[];

  @Column({
    type: 'enum',
    enum: ServiceType,
    array: true
  })
  @Field(() => ServiceType)
  serviceType: ServiceType[];

  @Column({
    type: 'enum',
    enum: SupportModel,
    array: true
  })
  @Field(() => SupportModel)
  supportModel: SupportModel[];

  @Column({
    type: 'enum',
    enum: TalentLevel,
    array: true
  })
  @Field(() => TalentLevel)
  talentLevel: TalentLevel[];

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  cancelPolicy: string;

  @Column()
  @Min(0)
  @Max(10)
  @Field(() => Number)
  dispatchAgreed: number

  @Column({
    type: 'enum',
    enum: IncrementTime,
  })
  @Field(() => IncrementTime)
  incrementTime: IncrementTime;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  sow: string;

  @Column({
    type: 'enum',
    enum: SowDesc,
  })
  @Field(() => SowDesc)
  sowDesc: SowDesc;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  owJd: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  serviceDeliv: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  ssInst: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  asInst: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  toolsReq: string;

  @Column({ type: 'boolean', default: false })
  @Field()
  namedWorker: boolean;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  assignedWorker: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  technicalSkill: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  behSkills: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  experienceReq: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  langReq: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  trainReq: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  trainDoc: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  reqTools: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  reqSoft: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  specReq: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'Customer Level 1 Escalation Email' })
  cl1ee: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'Customer Level 1 Escalation Contact #' })
  cl1ec: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'Customer Level 2 Escalation Email' })
  cl2ee: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'Customer Level 2 Escalation Contact #' })
  cl2ec: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'Cogent Level 1 Escalation Email' })
  cgl1ee: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'Cogent Level 1 Escalation Contact#' })
  cgl1ec: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'Cogent Level 2 Escalation Email' })
  cfl2ee: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'Cogent Level 2 Escalation Contact#' })
  cgl2ec: string;

  @Column()
  @Field(() => String)
  code: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  customerId: string;

  @ManyToOne(() => Customer, customer => customer.projects, { nullable: true })
  customer: Customer;

  @OneToMany(() => Jobsite, jobsite => jobsite.project, { nullable: true })
  jobsites: Jobsite[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}