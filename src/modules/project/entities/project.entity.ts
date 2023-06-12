import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Jobsite } from 'src/modules/jobsite/entities/jobsite.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @OneToMany(() => Jobsite, jobsite => jobsite.project,  { nullable: true , onDelete: "CASCADE"})
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