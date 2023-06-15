import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../../users/entities/user.entity';
import { TicketDate } from './ticketDate.entity';
import { Resource } from './../../resources/entity/resource.entity';

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