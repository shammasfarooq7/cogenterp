import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Resource } from './../../resources/entity/resource.entity';
import { TicketDate } from './ticketDate.entity';

@ObjectType()
@Entity("time_sheets")
export class TimeSheet {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  checkIn: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  checkOut: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  sdId: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  sdCheckIn: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  sdCheckOut: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  feopsCheckIn: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  feopsCheckOut: string;

  @Column()
  @Field(() => String)
  resourceId: string;

  @ManyToOne(() => Resource, resource => resource.timeSheets)
  @Field(() => Resource)
  resource: Resource;

  @Column()
  @Field(() => String)
  ticketDateId: string;

  @ManyToOne(() => TicketDate, ticketDate => ticketDate.timeSheets)
  @Field(() => TicketDate)
  ticketDate: TicketDate;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;

}
