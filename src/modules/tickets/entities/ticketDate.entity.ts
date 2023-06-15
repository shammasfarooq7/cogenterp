import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Ticket } from './ticket.entity';
import { TimeSheet } from './timeSheet.entity';
import { Resource } from './../../resources/entity/resource.entity';

@Entity("ticket_dates")
@ObjectType()
export class TicketDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column({ type: 'date' })
  @Field()
  date: Date;

  @Column({ type: 'time with time zone' })
  @Field()
  scheduledTime: string;

  @Column()
  @Field(() => String)
  ticketId: string;

  @ManyToOne(() => Ticket, ticket => ticket.ticketDates)
  @Field(() => Ticket)
  ticket: Ticket;

  // @ManyToMany(() => Resource, resource => resource.ticketDates)
  // @JoinTable({ name: 'time_sheets' })
  // @Field(() => [Resource])
  // resources: Resource[];

  @ManyToMany(() => TimeSheet, timeSheet => timeSheet.ticketDate)
  @Field(() => [TimeSheet])
  timeSheets: TimeSheet[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;
}
