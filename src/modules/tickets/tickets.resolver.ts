import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { IContext } from 'src/users/auth/interfaces/context.interface';
import { GetAllTicketsPayload } from './dto/get-all-tickets.dto';
import { GetAllTicketsInput } from './dto/get-all-tickets-input';
import { CommonPayload } from 'src/users/dto/common.dto';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) { }

  @Mutation(() => CommonPayload)
  createTicket(@Context() ctx: IContext, @Args('createTicketInput') createTicketInput: CreateTicketInput): Promise<CommonPayload> {
    return this.ticketsService.create(ctx.user, createTicketInput);
  }

  @Query(() => GetAllTicketsPayload)
  findAll(@Context() ctx: IContext, @Args('getAllTicketsInput') getAllTicketsInput: GetAllTicketsInput): Promise<GetAllTicketsPayload> {
    return this.ticketsService.findAll(getAllTicketsInput);
  }

  @Query(() => Ticket)
  findOne(@Args('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  // @Mutation(() => Ticket)
  // updateTicket(@Args('updateTicketInput') updateTicketInput: UpdateTicketInput) {
  //   return this.ticketsService.update(updateTicketInput.id, updateTicketInput);
  // }

  @Mutation(() => CommonPayload)
  deleteTicket(@Args('id') id: string): Promise<CommonPayload> {
    return this.ticketsService.delete(id);
  }
}
