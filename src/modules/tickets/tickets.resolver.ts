import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
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

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) { }

  @Roles(UserRole.SD, UserRole.CUSTOMER)
  @Mutation(() => CommonPayload)
  createTicket(@Context() ctx: IContext, @Args('createTicketInput') createTicketInput: CreateTicketInput): Promise<CommonPayload> {
    return this.ticketsService.create(ctx.user, createTicketInput);
  }

  @Roles(UserRole.SD, UserRole.CUSTOMER)
  @Query(() => GetAllTicketsPayload)
  getAllTickets(@Context() ctx: IContext, @Args('getAllTicketsInput') getAllTicketsInput: GetAllTicketsInput): Promise<GetAllTicketsPayload> {
    return this.ticketsService.findAll(getAllTicketsInput);
  }

  @Roles(UserRole.SD, UserRole.CUSTOMER)
  @Query(() => Ticket)
  getTicket(@Args('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  // @Mutation(() => Ticket)
  // updateTicket(@Args('updateTicketInput') updateTicketInput: UpdateTicketInput) {
  //   return this.ticketsService.update(updateTicketInput.id, updateTicketInput);
  // }

  @Roles(UserRole.SD, UserRole.CUSTOMER)
  @Mutation(() => CommonPayload)
  deleteTicket(@Args('id') id: string): Promise<CommonPayload> {
    return this.ticketsService.delete(id);
  }

  @Roles(UserRole.FEOPS)
  @Mutation(() => CommonPayload)
  assignResourcesToTicket(@Context() ctx: IContext, @Args('assignResourcesToTicketInput') assignResourcesToTicketInput: AssignResourcesToTicketInput): Promise<CommonPayload> {
    return this.ticketsService.assignResourcesToTicket(ctx.user, assignResourcesToTicketInput);
  }

  @Roles(UserRole.SD)
  @Mutation(() => CommonPayload)
  approveExternalTicket(@Args('id') id: string): Promise<CommonPayload>{
    return this.ticketsService.approveExternalTicket(id);
  }

  @Roles(UserRole.SD)
  @Query(() => GetAllTicketsPayload)
  getAllExternalTickets(): Promise<GetAllTicketsPayload> {
    return this.ticketsService.getAllExternalTickets();
  }

  @Roles(UserRole.FEOPS)
  @Mutation(() => CommonPayload)
  changeStatus(@Args('changeStatus') changeStatusInput: ChangeStatusInput): Promise<CommonPayload> {
    return this.ticketsService.changeStatus(changeStatusInput);
  }

}
