import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TicketDetail } from './ticketDetail.entity';

@Entity("ticket_attachments")
@ObjectType()
export class TicketAttachment {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  url: string;

  @Column()
  @Field()
  ticketDetailsId: number;

  @Field(() => TicketDetail)
  @ManyToOne(() => TicketDetail, ticketDetail => ticketDetail.attachments)
  @JoinColumn({ name: 'ticketDetailsId' })
  ticketDetail: TicketDetail;
}