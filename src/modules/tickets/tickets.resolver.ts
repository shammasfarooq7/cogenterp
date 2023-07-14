import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { IContext } from 'src/users/auth/interfaces/context.interface';
import { GetAllTicketsPayload } from './dto/get-all-tickets.dto';
import { GetAllTicketsInput } from './dto/get-all-tickets-input';
import { CommonPayload } from 'src/users/dto/common.dto';
import { UserRole } from '../../users/entities/role.entity';
import { Roles } from '../../users/roles.decorator';
import { AssignResourcesToTicketInput } from './dto/assign-resources-to-ticket.input';
import { ChangeStatusInput } from './dto/change-status.input';
import { GetTodayTicketsInput } from './dto/get-today-tickets-input';
import { TimeSheet } from './entities/timeSheet.entity';
import { ICurrentUser } from '../../users/auth/interfaces/current-user.interface';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) { }

  @Roles(UserRole.SD, UserRole.CUSTOMER)
  @Mutation(() => CommonPayload)
  createTicket(@Context() ctx: IContext, @Args('createTicketInput') createTicketInput: CreateTicketInput): Promise<CommonPayload> {
    return this.ticketsService.create(ctx.user, createTicketInput);
  }

  @Roles(UserRole.SD, UserRole.CUSTOMER, UserRole.ADMIN, UserRole.RESOURCE)
  @Query(() => GetAllTicketsPayload)
  getAllTickets(@Context() ctx: IContext, @Args('getAllTicketsInput') getAllTicketsInput: GetAllTicketsInput): Promise<GetAllTicketsPayload> {
    return this.ticketsService.findAll(ctx.user, getAllTicketsInput);
  }

  @Roles(UserRole.SD, UserRole.CUSTOMER, UserRole.ADMIN, UserRole.RESOURCE)
  @Query(() => GetAllTicketsPayload)
  async getTodayTicket(@Context() ctx: IContext, @Args('getTodayTicketsInput') getTodayTicketsInput: GetTodayTicketsInput): Promise<GetAllTicketsPayload> {
    return await this.ticketsService.getTodayTicket(ctx.user, getTodayTicketsInput);
  }

  @Roles(UserRole.SD, UserRole.CUSTOMER, UserRole.ADMIN)
  @Query(() => Ticket)
  getTicket(@Args('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  @Roles(UserRole.SD, UserRole.FEOPS)
  @Mutation(() => Ticket)
  updateTicket(@Args('updateTicketInput') updateTicketInput: UpdateTicketInput) {
    return this.ticketsService.updateTicket(updateTicketInput.id, updateTicketInput);
  }

  @Roles(UserRole.SD, UserRole.ADMIN)
  @Mutation(() => CommonPayload)
  deleteTicket(@Args('id') id: string): Promise<CommonPayload> {
    return this.ticketsService.deleteTicket(id);
  }

  @Roles(UserRole.FEOPS)
  @Mutation(() => CommonPayload)
  assignResourcesToTicket(@Context() ctx: IContext, @Args('assignResourcesToTicketInput') assignResourcesToTicketInput: AssignResourcesToTicketInput): Promise<CommonPayload> {
    return this.ticketsService.assignResourcesToTicket(ctx.user, assignResourcesToTicketInput);
  }

  @Roles(UserRole.SD)
  @Mutation(() => CommonPayload)
  approveExternalTicket(@Args('id') id: string): Promise<CommonPayload> {
    return this.ticketsService.approveExternalTicket(id);
  }

  @Roles(UserRole.FEOPS, UserRole.SD)
  @Mutation(() => CommonPayload)
  changeStatus(@Args('changeStatus') changeStatusInput: ChangeStatusInput): Promise<CommonPayload> {
    return this.ticketsService.changeStatus(changeStatusInput);
  }

  @Roles(UserRole.FEOPS, UserRole.SD)
  @Query(() => [TimeSheet])
  ticketTimeSheetData(@Args('ticketId') ticketId: string): Promise<TimeSheet[]> {
    return this.ticketsService.ticketTimeSheetData(ticketId);
  }

  @Roles(UserRole.FEOPS, UserRole.SD)
  @Query()
  getDashboardStatsTicket(): Promise<{todayCount: number, futureCount: number, inProgressCount: Number}> {
    return this.ticketsService.getDashboardStatsTicket();
  }

  @Roles(UserRole.CUSTOMER)
  @Query()
  getDashboardStatsCustomerTicket(@Context() ctx: ICurrentUser): Promise<{projectCount: number, futureCount: number, inProgressCount: Number}> {
    return this.ticketsService.getDashboardStatsCustomerTicket(ctx);
  }

}
