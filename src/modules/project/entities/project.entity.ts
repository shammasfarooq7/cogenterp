import { Field, ObjectType } from '@nestjs/graphql';
import { Jobsite } from '../../jobsite/entities/jobsite.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';

@ObjectType()
@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, {nullable: true})
  customerId: string;

  @ManyToOne(() => Customer, customer => customer.projects, { nullable: true })
  customer: Customer;

  @OneToMany(() => Jobsite, jobsite => jobsite.project,  { nullable: true })
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