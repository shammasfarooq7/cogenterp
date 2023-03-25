import { IsPhoneNumber } from '@nestjs/class-validator';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';


export enum UserStatus {
  DIRECT = 0,
  INDIRECT = 1,
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
  description: 'The user status',
});

export enum EngagementType {
  FSE = 0,
  FTE = 1,
  PTE = 2
}

registerEnumType(EngagementType, {
  name: 'EngagementType',
  description: 'The user engagement type',
});

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
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
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.DIRECT,
  })
  @Field((type) => UserStatus)
  status: UserStatus;

  @Column({ nullable: true })
  @Field({nullable: true})
  vendorName: string;

  @Column({
    type: 'enum',
    enum: EngagementType,
    default: EngagementType.FSE,
  })
  @Field((type) => EngagementType)
  engagementType: EngagementType;

  @Column({ nullable: true })
  @Field({nullable: true})
  rpocName: string;

  @Column('varchar', {length: 50, nullable: true })
  @Field(() => String, {nullable: true})
  rpocEmail: string;

  @Column({ nullable: true })
  @Field({ nullable: true, defaultValue: null })
  @IsPhoneNumber()
  rpocContactNumber: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  firstName: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  lastName: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  middleName: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  idCardNumber: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  taxNumber: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  languages: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  nationality: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  region: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  country: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  state: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  city: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  postalCode: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  addressLine1: string;

  @Column({ nullable: true })
  @Field({nullable: true})
  addressLine2: string;

  @Column({ nullable: true })
  @Field({ nullable: true, defaultValue: null })
  @IsPhoneNumber()
  whatsappNumber: string;

  @Column('varchar', {length: 50, nullable: true })
  @Field(() => String, {nullable: true})
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

  @Field(() => [Role], { nullable: 'itemsAndList' })
  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({ name: 'UserRoles' })
  roles: Role[];
  
  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;
}


// add whatsapp group and group link.
// work permit status
// language array
// skill set array