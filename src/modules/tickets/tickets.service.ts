import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { TicketDetail } from './entities/ticketDetail.entity';
import { AppDataSource } from 'src/data-source';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketDate } from './entities/ticketDate.entity';
import { ICurrentUser } from 'src/users/auth/interfaces/current-user.interface';
import { GetAllTicketsInput } from './dto/get-all-tickets-input';
import { GetAllTicketsPayload } from './dto/get-all-tickets.dto';
import { CommonPayload } from 'src/users/dto/common.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>,
    @InjectRepository(TicketDetail) private ticketDetailRepo: Repository<TicketDetail>,
    @InjectRepository(TicketDate) private ticketDateRepo: Repository<TicketDate>,
  ) { }

  async create(currentUser: ICurrentUser, createTicketInput: CreateTicketInput): Promise<CommonPayload> {
    const queryRunner = AppDataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction()
      const { ticketType, ticketDates, numberOfHoursReq, numberOfResource, ...TicketDetail } = createTicketInput;

      const isExternal = !currentUser.roles?.includes("sd");
      // Create ticket detail
      const ticketDetail = await this.ticketDetailRepo.save({
        ...TicketDetail
      })

      // For ticket type FSE,PTE
      if (ticketType === "PTE" || ticketType === "FTE") {
        // Create one ticket
        const ticket = await this.ticketRepo.save({
          ticketType,
          numberOfHoursReq,
          numberOfResource,
          isExternal,
          ticketDetail
        })

        // Create ticket dates against a ticket

        for (const date of ticketDates) {
          await this.ticketDateRepo.save({
            date,
            ticket
          })
        }

      }

      else {
        for (const date of ticketDates) {

          const ticket = await this.ticketRepo.save({
            ticketType,
            numberOfHoursReq,
            numberOfResource,
            isExternal
          })

          await this.ticketDateRepo.save({
            date,
            ticket
          })

        }
      }

      return { message: "Ticket Created Successfully!" };

    } catch (error) {
      await queryRunner.rollbackTransaction()
    }
    finally {
      await queryRunner.release()
    }

  }

  async findAll(getAllTicketsInput: GetAllTicketsInput): Promise<GetAllTicketsPayload> {

    const { limit = 20, page = 0 } = getAllTicketsInput;

    const [tickets, count] = await this.ticketRepo.findAndCount({
      where: {
        deletedAt: IsNull()
      },
      skip: page * limit,
      take: limit
    })

    return {
      count,
      tickets
    }
  }

  async findOne(id: string): Promise<Ticket> {

    const ticket = await this.ticketRepo.findOne({
      where: {
        id,
        deletedAt: IsNull()
      }
    })

    return ticket;
  }

  update(id: number, updateTicketInput: UpdateTicketInput) {
    return `This action updates a #${id} ticket`;
  }

  async delete(id: string): Promise<CommonPayload> {
    await this.ticketRepo.update(
      { id },
      { deletedAt: new Date() })

    return { message: "Ticket Deleted Successfully!" };

  }
}
