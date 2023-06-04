import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { TicketDetail } from './ticketDetail.entity';
import { TicketDate } from './ticketDate.entitiy';

@ObjectType()
@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  ticketDetailId: string;

  @ManyToOne(() => TicketDetail, ticketDetail => ticketDetail.tickets)
  @Field(() => TicketDetail)
  ticketDetail: TicketDetail;

  @OneToMany(() => TicketDate, ticketDate => ticketDate.ticket)
  @Field(() => [TicketDate])
  ticketDates: TicketDate[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;

}