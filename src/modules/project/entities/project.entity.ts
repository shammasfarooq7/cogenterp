import { Field } from '@nestjs/graphql';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Jobsite } from 'src/modules/jobsite/entities/jobsite.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  customerId: string;

  @ManyToOne(() => Customer, customer => customer.projects, { nullable: true })
  customer: Customer;

  @OneToMany(() => Jobsite, jobsite => jobsite.project,  { nullable: true })
  jobsites: Jobsite[];
}