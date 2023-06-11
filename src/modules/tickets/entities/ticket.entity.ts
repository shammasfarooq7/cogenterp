import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { TicketDetail } from './ticketDetail.entity';
import { TicketDate } from './ticketDate.entity';


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

  //need to change according to customer tickets
  // @Column()
  // @Field(() => String)
  // customerTicketNumber: string;

  // customer ID to get his name, when relation will be created.
  // @Column()
  // @Field(() => String)
  // customerName: string;

  @Column()
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

  @Column()
  @Field(() => String)
  ticketDetailId: string;

  @ManyToOne(() => TicketDetail, ticketDetail => ticketDetail.tickets)
  @Field(() => TicketDetail)
  ticketDetail: TicketDetail;

  @OneToMany(() => TicketDate, ticketDate => ticketDate.ticket)
  @Field(() => [TicketDate])
  ticketDates: TicketDate[];

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