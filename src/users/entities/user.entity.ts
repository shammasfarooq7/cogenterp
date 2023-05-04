import { IsPhoneNumber } from '@nestjs/class-validator';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, Generated, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Role } from './role.entity';
import { UserPaymentMethod } from './../../modules/userPaymentMethods/entity/userPaymentMethod.entity';


export enum UserStatus {
  DIRECT = "Direct",
  INDIRECT = "Indirect",
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
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
  DriverLicense = "dl",
  Passport = "pp",
  IdCard = "id",
  ResidencePermit = "rp"
}

registerEnumType(IdCardType, {
  name: 'IdCardType',
  description: 'The user id card type',
});

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;


  @Column('varchar', { length: 50, unique: true })
  @Field(() => String)
  email: string;

  @Column('varchar', { length: 100 })
  password: string;

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
    enum: UserStatus,
    default: UserStatus.DIRECT,
  })
  @Field((type) => UserStatus)
  status: UserStatus;

  @Column({
    type: 'enum',
    enum: IdCardType,
    nullable: true
  })
  @Field((type) => IdCardType)
  idCardType: IdCardType;

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
  })
  @Field((type) => EngagementType)
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
  @Field(() => [String])
  languages: string[];

  @Column("text", { array: true, nullable: true })
  @Field(() => [String])
  skillSet: string[];

  @Column("text", { array: true, nullable: true })
  @Field(() => [String])
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

  @Column('varchar', { length: 50, nullable: true })
  @Field({ nullable: true })
  onboardedBy: string;

  @Column("boolean", { default: false })
  @Field()
  isOnboarded: boolean;

  @Column("boolean", { default: false })
  @Field()
  isARequest: boolean;

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: "user_roles" })
  roles: Role[];

  @Field(() => [UserPaymentMethod])
  @OneToMany(() => UserPaymentMethod, (userPaymentMethod) => userPaymentMethod.user)
  userPaymentMethod: UserPaymentMethod[]

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


// add whatsapp group and group link.
// work permit status