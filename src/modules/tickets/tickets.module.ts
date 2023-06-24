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
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities/customer.entity';
import { ProjectService } from '../project/project.service';
import { Jobsite } from '../jobsite/entities/jobsite.entity';
import { JobsiteService } from '../jobsite/jobsite.service';
import { Project } from '../project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/entities/role.entity';
import { RoleService } from 'src/users/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketDate, TicketDetail, TimeSheet, TicketAttachment, Resource, Customer, Jobsite, Project, User, Role])
  ],
  providers: [TicketsResolver, TicketsService, TypeOrmModule, TicketDate, CustomerService, ProjectService, JobsiteService, RoleService],
  exports: [TicketsService]

})
export class TicketsModule { }
