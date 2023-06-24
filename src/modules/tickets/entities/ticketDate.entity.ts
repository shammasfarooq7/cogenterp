import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Ticket } from '../entities/ticket.entity';
import { TimeSheet } from './timeSheet.entity';

@ObjectType()
@Entity("ticket_dates")
export class TicketDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value.toISOString().split('T')[0],
    }
  })
  @Field(() => Date)
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

  // @ManyToMany(() => Resource, (resource) => resource.ticketDates, { nullable: true })
  // @JoinTable({ name: 'time_sheets' })
  // @Field(() => [Resource], { nullable: true })
  // resources: Resource[];

  @OneToMany(() => TimeSheet, timeSheet => timeSheet.ticketDate, { nullable: true })
  @Field(() => [TimeSheet], { nullable: true })
  timeSheets: TimeSheet[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;
}
