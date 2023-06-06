import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { TicketDate } from './ticketDate.entitiy';

@Entity("time_sheets")
@ObjectType()
export class TimeSheet {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  checkIn: string;

  @Column()
  @Field(() => String)
  checkOut: string;

  @Column()
  @Field(() => String)
  sdId: string;

  @Column()
  @Field(() => String)
  sdCheckIn: string;

  @Column()
  @Field(() => String)
  sdCheckOut: string;

  @Column()
  @Field(() => String)
  feopsCheckIn: string;

  @Column()
  @Field(() => String)
  feopsCheckOut: string;

  @Column()
  @Field(() => String)
  userId: string;

  @ManyToOne(() => User, user => user.timeSheets)
  @Field(() => User)
  user: User;

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