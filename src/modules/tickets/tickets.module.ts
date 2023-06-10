import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { Ticket } from './entities/ticket.entity';
import { TicketDate } from './entities/ticketDate.entitiy';
import { TicketDetail } from './entities/ticketDetail.entity';
import { TimeSheet } from './entities/timeSheet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketDate, TicketDetail, TimeSheet])
  ],
  providers: [TicketsResolver, TicketsService, TypeOrmModule],
  exports: [TicketsService]

})
export class TicketsModule {}
