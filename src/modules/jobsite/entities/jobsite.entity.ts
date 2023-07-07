import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Project } from '../../project/entities/project.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Max, Min } from '@nestjs/class-validator';


export enum IncrementTime {
  FIFTEEN = "15",
  THIRTY = "30",
  SIXTY = "60",
  hund20 = "120"
}

registerEnumType(IncrementTime, {
  name: 'IncrementTimeForJob',
  description: 'IncrementTime',
});


export enum SupportType {
  FTE_WBF = "FTE-WBF",
  FTE_NBF = "FTE-NBF",
  FSE = "FSE",
  PTE_WBF = "PTE-WBF",
  PTE_NBF = "PTE-NBF"
}

registerEnumType(SupportType, {
  name: 'SupportType',
  description: 'SupportType',
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
  name: 'ServiceTypeForJob',
  description: 'ServiceType',
});

export enum ServiceCatItem {
  BREAKFIX = "BREAKFIX",
  IMAC = "IMAC",
  CABLING = "CABLING",
  HandF = "H&F",
  TRAINING = "TRAINING",
  DSS = "DSS"
}

registerEnumType(ServiceCatItem, {
  name: 'ServiceCatItem',
  description: 'ServiceCatItem',
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
  name: 'AgreedSlaForJob',
  description: 'Agreed SLA',
});

export enum Coverage {
  fiveD9H = "5D9H",
  t4X7AFTH = "24X7AFTH",
  t4X7WKND = "24X7WKND",
  t4X7HLDY = "24X7HLDY"
}

registerEnumType(Coverage, {
  name: 'CoverageForJob',
  description: 'coverage',
});

export enum TechnologyType {
  EUC = "EUC",
  NETWORK = "NETWORK",
  LINUX = "LINUX",
  MAC = "MAC"
}

registerEnumType(TechnologyType, {
  name: 'TechnologyTypeForJob',
  description: 'technology type',
});

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP'
}

registerEnumType(Currency, {
  name: 'Currency',
  description: 'currency',
});

@ObjectType()
@Entity('jobsites')
export class Jobsite {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  country: string;

  @Column()
  @Field(() => String)
  city: string;

  @Column()
  @Field(() => String)
  state: string;

  @Column()
  @Field(() => String)
  province: string;

  @Column()
  @Field(() => String)
  postcode: string;

  @Column()
  @Field(() => String)
  siteAddress: string;

  @Column()
  @Field(() => String)
  pocName: string;

  @Column()
  @Field(() => String)
  pocContactNumber: string;

  @Column()
  @Field(() => String)
  pocEmailAdrress: string;

  @Column()
  @Field(() => String)
  ppe1h: string;

  @Column()
  @Field(() => String)
  ppe2h: string;

  @Column()
  @Field(() => String)
  ppe3h: string;

  @Column()
  @Field(() => String)
  ppe4h: string;

  @Column()
  @Field(() => String)
  ppe5h: string;

  @Column()
  @Field(() => String)
  ppe6h: string;

  @Column()
  @Field(() => String)
  ppe7h: string;

  @Column()
  @Field(() => String)
  ppe8h: string;

  @Column()
  @Field(() => String)
  tandm30: string;

  @Column()
  @Field(() => String)
  tandm1h: string;

  @Column()
  @Field(() => String)
  afth: string;

  @Column()
  @Field(() => String)
  wknd: string;

  @Column()
  @Field(() => String)
  ph: string;

  @Column({ type: 'boolean', default: false })
  @Field()
  sat: boolean;

  @Column({ type: 'boolean', default: false })
  @Field()
  sun: boolean;

  @Column()
  @Field(() => String)
  siteTiming: string;

  @Column()
  @Field(() => String)
  timeZone: string;

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

  @Column({
    type: 'enum',
    enum: ServiceType,
    array: true
  })
  @Field(() => ServiceType)
  serviceType: ServiceType[];

  @Column({
    type: 'enum',
    enum: SupportType,
    array: true
  })
  @Field(() => SupportType)
  supportType: SupportType[];

  @Column({
    type: 'enum',
    enum: ServiceCatItem,
    array: true
  })
  @Field(() => ServiceCatItem)
  serviceCatItem: ServiceCatItem[];

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
    enum: Currency,
    array: true
  })
  @Field(() => Currency)
  currency: Currency[];

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  projectId: string;

  @ManyToOne(() => Project, project => project.jobsites, { nullable: true })
  project: Project;

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
