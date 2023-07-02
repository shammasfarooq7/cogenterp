import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { TicketDetail } from '../entities/ticketDetail.entity';
import { TicketDate } from '../entities/ticketDate.entity';
import { Customer } from './../../customer/entities/customer.entity';


export enum TicketType {
  FSE = "FSE",
  FTE = "FTE",
  PTE = "PTE"
}

registerEnumType(TicketType, {
  name: 'TicketType',
  description: 'The ticket type',
});
@ObjectType()
@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  customerTicketNumber: string;

  @Column()
  @Field(() => String)
  customerName: string;

  @Column({ nullable: true })
  @Field(() => String)
  cogentCaseNumber: string;

  @BeforeInsert()
  generateDerivedId() {
    this.cogentCaseNumber = `${this.ticketType}${this.id}`;
  }

  @Column("text", { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  cogentWorkOrderNumber: string[];

  @Column({
    type: 'enum',
    enum: TicketType,
    nullable: false
  })
  @Field((type) => TicketType, { nullable: false })
  ticketType: TicketType;

  //to check whether its SD or customer ticket. external for customer.
  @Column({ default: false })
  isExternal: boolean;

  @Column()
  @Field(() => String)
  numberOfHoursReq: string;

  @Column()
  @Field(() => String)
  numberOfResource: string;

  @Column({ nullable: true })
  @Field(() => String)
  ticketDetailId: string;

  @ManyToOne(() => TicketDetail, ticketDetail => ticketDetail.tickets, { nullable: true })
  @Field(() => TicketDetail)
  ticketDetail: TicketDetail;

  @OneToMany(() => TicketDate, ticketDate => ticketDate.ticket)
  @Field(() => [TicketDate])
  ticketDates: TicketDate[];

  @Column()
  @Field(() => String)
  projectId: string;

  @Column()
  @Field(() => String)
  jobSiteId: string;

  @Column({ default: false })
  isAdhoc: boolean;

  @Column()
  @Field(() => String)
  customerId: string;

  @ManyToOne(() => Customer, customer => customer.tickets)
  customer: Customer;

  @Column({ nullable: false, type: 'timestamptz' })
  @Field(() => Date, { nullable: false })
  ticketReceivedTime: Date;

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