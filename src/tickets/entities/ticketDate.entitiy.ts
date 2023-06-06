import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Ticket } from './ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { TimeSheet } from './timeSheet.entity';

@Entity("ticket_dates")
@ObjectType()
export class TicketDate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  ticketId: string;

  @Column({ type: 'date' })
  @Field()
  date: Date;

  @Column({ type: 'time with time zone' })
  @Field()
  scheduledTime: string;

  @ManyToOne(() => Ticket, ticket => ticket.ticketDates)
  @Field(() => Ticket)
  ticket: Ticket;

  @ManyToMany(() => User, user => user.ticketDates)
  @JoinTable({ name: 'time_sheets' })
  @Field(() => [User])
  users: User[];

  @ManyToMany(() => TimeSheet, timeSheet => timeSheet.ticketDate)
  @JoinTable({ name: 'time_sheets' })
  @Field(() => [TimeSheet])
  timeSheets: TimeSheet[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;
}
