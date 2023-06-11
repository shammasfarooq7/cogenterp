import { IsPhoneNumber } from '@nestjs/class-validator';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { UserPaymentMethod } from './../../../modules/userPaymentMethods/entity/userPaymentMethod.entity';
import { User } from 'src/users/entities/user.entity';
import { TicketDate } from 'src/modules/tickets/entities/ticketDate.entity';
import { TimeSheet } from 'src/modules/tickets/entities/timeSheet.entity';


export enum ResourceStatus {
  DIRECT = "Direct",
  INDIRECT = "Indirect",
}

registerEnumType(ResourceStatus, {
  name: 'ResourceStatus',
  description: 'The user status',
});

export enum EngagementType {
  FSE = "Fse",
  FTE = "Fte",
  PTE = "Pte",
  Remote = "Remote"
}

registerEnumType(EngagementType, {
  name: 'EngagementType',
  description: 'The user engagement type',
});

export enum IdCardType {
  DriverLicense = "DriverLicense",
  Passport = "Passport",
  IdCard = "IdCard",
  ResidencePermit = "ResidencePermit"
}

registerEnumType(IdCardType, {
  name: 'IdCardType',
  description: 'The user id card type',
});

export enum InterviewStatus {
  Complete = "Complete",
  Scheduled = "Scheduled",
  NotScheduled = "NotScheduled",
}

registerEnumType(InterviewStatus, {
  name: 'InterviewStatus',
  description: 'The user interview status',
});
@ObjectType()
@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column('varchar', { length: 50, unique: true })
  @Field(() => String)
  email: string;

  @OneToOne(() => User, user => user.resource)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  @Field({ nullable: true, defaultValue: null })
  @IsPhoneNumber()
  mobileNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true, defaultValue: null })
  @IsPhoneNumber()
  contactNumber: string;

  @Column({
    type: 'enum',
    enum: ResourceStatus,
    default: ResourceStatus.DIRECT,
    nullable: true
  })
  @Field((type) => ResourceStatus, { nullable: true })
  status: ResourceStatus;

  @Column({
    type: 'enum',
    enum: IdCardType,
    nullable: true
  })
  @Field((type) => IdCardType, { nullable: true })
  idCardType: IdCardType;

  @Column({
    type: 'enum',
    enum: InterviewStatus,
    nullable: true
  })
  @Field(() => InterviewStatus, { nullable: true })
  interviewStatus: InterviewStatus;

  @Column({ nullable: true })
  @Field({ nullable: true })
  vendorName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  whatsappGroup: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  whatsappGroupLink: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  workPermitStatus: string;

  @Column({ type: "boolean", nullable: true })
  @Field({ nullable: true })
  contractDocuments: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  availability: string;

  @Column({
    type: 'enum',
    enum: EngagementType,
    default: EngagementType.FSE,
    nullable: true
  })
  @Field((type) => EngagementType, { nullable: true })
  engagementType: EngagementType;

  @Column({ nullable: true })
  @Field({ nullable: true })
  rpocName: string;

  @Column('varchar', { length: 50, nullable: true })
  @Field(() => String, { nullable: true })
  rpocEmail: string;

  @Column({ nullable: true })
  @Field({ nullable: true, defaultValue: null })
  @IsPhoneNumber()
  rpocContactNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  idCardNumber: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  taxNumber: string;

  @Column("text", { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  languages: string[];

  @Column("text", { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  skillSet: string[];

  @Column("text", { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  availableTools: string[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  region: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  country: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  state: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  city: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  postalCode: string;

  @Column({ type: "text", nullable: true })
  @Field({ nullable: true })
  addressLine1: string;

  @Column({ type: "text", nullable: true })
  @Field({ nullable: true })
  addressLine2: string;

  @Column({ nullable: true })
  @Field({ nullable: true, defaultValue: null })
  @IsPhoneNumber()
  whatsappNumber: string;

  @Column('varchar', { length: 50, nullable: true })
  @Field(() => String, { nullable: true })
  cogentEmail: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  descriptionColor: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  hourlyRate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  halfDayRate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fullDayRate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  monthlyRate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  anyExtraRate: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  transport: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  mobility: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  resumeDocUrl: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  identityDocUrl: string;

  @ManyToOne(() => User, user => user.onboardedResources, { nullable: true })
  @JoinColumn({ name: 'onboardedBy' })
  @Field(() => User, { nullable: true })
  onboardedBy: User;

  @Column("boolean", { default: false })
  @Field()
  isOnboarded: boolean;

  @Column("boolean", { default: false })
  @Field()
  isARequest: boolean;

  @Column("boolean", { default: false })
  @Field()
  requestApproved: boolean;

  @Field(() => [UserPaymentMethod], { nullable: true })
  @OneToMany(() => UserPaymentMethod, (userPaymentMethod) => userPaymentMethod.resource, { nullable: true })
  userPaymentMethod: UserPaymentMethod[]

  @ManyToMany(() => TicketDate, ticketDate => ticketDate.resources)
  @JoinTable({ name: 'time_sheets' })
  @Field(() => [TicketDate])
  ticketDates: TicketDate[];

  @ManyToMany(() => TimeSheet, timeSheet => timeSheet.resource)
  @JoinTable({ name: 'time_sheets' })
  @Field(() => [TimeSheet])
  timeSheets: TimeSheet[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  @Field(() => Date, { nullable: true })
  onboardedAt: Date;
}
