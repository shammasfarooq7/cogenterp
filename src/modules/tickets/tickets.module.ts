import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { Ticket } from './entities/ticket.entity';
import { TicketDetail } from './entities/ticketDetail.entity';
import { TimeSheet } from './entities/timeSheet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketAttachment } from './entities/ticketAttachment.entity';
import { TicketDate } from './entities/ticketDate.entity';
import { Resource } from '../resources/entity/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketDate, TicketDetail, TimeSheet, TicketAttachment, Resource])
  ],
  providers: [TicketsResolver, TicketsService, TypeOrmModule, TicketDate],
  exports: [TicketsService]

})
export class TicketsModule { }
