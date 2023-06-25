import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Ticket } from '../entities/ticket.entity';
import { TicketAttachment } from './ticketAttachment.entity';


export enum Region {
  EMEA = "EMEA",
  APAC = "APAC",
  AMER = "AMER",
  LATAM = "LATAM"
}

registerEnumType(Region, {
  name: 'Region',
  description: 'region',
});

export enum TechnologyType {
  EUC = "EUC",
  NETWORK = "NETWORK",
  OTHER = "OTHER",
}

registerEnumType(TechnologyType, {
  name: 'TechnologyType',
  description: 'technology type',
});

export enum ServiceLevel {
  L0 = "L0",
  L1 = "L1",
  L2 = "L2",
  L3 = "L3",
  L4 = "L4",

}

registerEnumType(ServiceLevel, {
  name: 'ServiceLevel',
  description: 'service level',
});

export enum ServicePriority {
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  P4 = "P4",
  P5 = "P5",
}

registerEnumType(ServicePriority, {
  name: 'ServicePriority',
  description: 'service priority',
});

export enum SlaPriority {
  t3BD = "3BD",
  NBD = "NBD",
  SBD = "SBD",
  SBDH4 = "SBDH4",
  t4x7 = "24x7"
}

registerEnumType(SlaPriority, {
  name: 'SlaPriority',
  description: 'sla priority',
});

@Entity("ticket_details")
@ObjectType()
export class TicketDetail {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  accountName: string;

  @Column()
  @Field(() => String)
  endClientName: string;

  @Column()
  @Field(() => String)
  spocName: string;

  @Column()
  @Field(() => String)
  spocContactNumber: string;

  @Column()
  @Field(() => String)
  spocEmailAddress: string;

  @Column()
  @Field(() => String)
  siteAccessInstruction: string;

  @Column()
  @Field(() => String)
  customerCaseNumber: string;

  @Column()
  @Field(() => String)
  jobSummary: string;

  @Column()
  @Field(() => String)
  caseDetails: string;

  @Column()
  @Field(() => String)
  scopeOfWork: string;

  @Column()
  @Field(() => String)
  instructions: string;

  @Column()
  @Field(() => String)
  addInstruction: string;

  @Column()
  @Field(() => String)
  specialInstruction: string;

  @Column()
  @Field(() => String)
  hardwareSN: string;

  @Column("text", { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  toolsRequested: string[];

  @Column({
    type: 'enum',
    enum: TechnologyType,
    nullable: true
  })
  @Field((type) => TechnologyType, { nullable: true })
  technologyType: TechnologyType;

  @Column({
    type: 'enum',
    enum: Region,
    nullable: true
  })
  @Field((type) => Region, { nullable: true })
  region: Region;

  @Column("text", { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  serviceType: string[];

  @Column({
    type: 'enum',
    enum: ServiceLevel,
    nullable: false
  })
  @Field((type) => ServiceLevel, { nullable: false })
  serviceLevel: ServiceLevel;

  @Column({
    type: 'enum',
    enum: ServicePriority,
    nullable: false
  })
  @Field((type) => ServicePriority, { nullable: false })
  servicePriority: ServicePriority;

  @Column({
    type: 'enum',
    enum: SlaPriority,
    nullable: false
  })
  @Field((type) => SlaPriority, { nullable: false })
  slaPriority: SlaPriority;

  @Column({ nullable: true })
  @Field({ nullable: true })
  serviceDocUrl: string;

  @Field(() => [Ticket])
  @OneToMany(() => Ticket, ticket => ticket.ticketDetail)
  tickets: Ticket[];

  @Field(() => [TicketAttachment])
  @OneToMany(() => TicketAttachment, ticketAttachment => ticketAttachment.ticketDetail)
  attachments: TicketAttachment[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;

}