import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Ticket } from 'src/modules/tickets/entities/ticket.entity';

@ObjectType()
@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  vendorReference: string;

  @Column()
  @Field(() => String)
  website: string;

  @Column()
  @Field(() => String)
  establishYear: string;

  @Column()
  @Field(() => String)
  employeesCount: string;

  @Column()
  @Field(() => String)
  dispatchGroupEmail: string;

  @Column()
  @Field(() => String)
  city: string;

  @Column()
  @Field(() => String)
  employeeCountLinkedin: string;

  @Column({nullable: false})
  @Field(() => String, {nullable: false})
  phone: string;

  @Column({nullable: false})
  @Field(() => String, {nullable: false})
  country: string;

  @Column({nullable: false})
  @Field(() => String, {nullable: false})
  postCode: string;

  @Column()
  @Field(() => String)
  linkedinUrl: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column({nullable: false})
  @Field(() => String, {nullable: false})
  stateProvince: string;

  @Column({nullable: false})
  @Field(() => String, {nullable: false})
  address: string;

  @Column()
  @Field(() => String)
  annualRevenue: string;

  @Column()
  @Field(() => String)
  revenueSoftware: string;

  @Column()
  @Field(() => String)
  revenueConsultancy: string;

  @Column()
  @Field(() => String)
  revenueSupport: string;

  @Column()
  @Field(() => String)
  revenueLogistics: string;

  @Column()
  @Field(() => String)
  revenueOther: string;

  @Column()
  @Field(() => String)
  contactNumber: string;

  @Column()
  @Field(() => String)
  addressLine1: string;

  @Column()
  @Field(() => String)
  addressLine2: string;

  @Column()
  @Field(() => String)
  emailId: string;

  @Column()
  @Field(() => String)
  mobile: string;

  @Column()
  @Field(() => String)
  whatsappNumber: string;

  @Column()
  @Field(() => String)
  whatsappGroup: string;

  @Column()
  @Field(() => String)
  whatsappLink: string;

  @Column({nullable: false})
  @Field(() => String, {nullable: false})
  cogentEmailId: string;

  @Column()
  @Field(() => String)
  workPermitStatus: string;

  @Column()
  @Field(() => String)
  primaryTechService: string;

  @Column()
  @Field(() => String)
  fieldService: string;

  @Column()
  @Field(() => String)
  keyCustomerSupport: string;

  @Column()
  @Field(() => String)
  languageSupport: string;

  @Column()
  @Field(() => String)
  countrySupported: string;

  @Column()
  @Field(() => String)
  certification: string;

  @Column()
  @Field(() => String)
  customerAbbr: string;

  @OneToMany(() => Project, project => project.customer,  { nullable: true, onDelete: "CASCADE" })
  projects: Project[];

  @ManyToOne(() => User, user => user.onboardedCustomers, { nullable: true })
  @JoinColumn({ name: 'onboardedBy' })
  @Field(() => User, { nullable: true })
  onboardedBy: User;

  @OneToOne(() => User, user => user.customer)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Ticket, ticket => ticket.customer,  { nullable: true, onDelete: "CASCADE" })
  tickets: Ticket[];

  @Column({ nullable: true, type: 'timestamptz' })
  @Field(() => Date, { nullable: true })
  onboardedAt: Date;

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