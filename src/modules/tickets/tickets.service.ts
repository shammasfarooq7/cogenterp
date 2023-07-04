import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { TicketDetail } from './entities/ticketDetail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, DataSource, In } from 'typeorm';
import { Ticket, TicketType } from './entities/ticket.entity';
import { ICurrentUser } from 'src/users/auth/interfaces/current-user.interface';
import { GetAllTicketsInput } from './dto/get-all-tickets-input';
import { GetAllTicketsPayload } from './dto/get-all-tickets.dto';
import { CommonPayload } from 'src/users/dto/common.dto';
import { UserRole } from 'src/users/entities/role.entity';
import { TicketDate } from './entities/ticketDate.entity';
import { AssignResourcesToTicketInput } from './dto/assign-resources-to-ticket.input';
import { Resource } from '../resources/entity/resource.entity';
import { TimeSheet } from './entities/timeSheet.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Project } from '../project/entities/project.entity';
import { Jobsite } from '../jobsite/entities/jobsite.entity';
import { ChangeStatusInput } from './dto/change-status.input';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Jobsite) private jobsiteRepo: Repository<Jobsite>,
    private dataSource: DataSource
  ) { }

  async create(currentUser: ICurrentUser, createTicketInput: CreateTicketInput): Promise<CommonPayload> {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction()
    try {
      const { ticketType, customerId, projectId, jobSiteId, ticketDates, numberOfHoursReq, numberOfResource, scheduledTime, ...detail } = createTicketInput;

      const customer = await this.customerRepo.findOneBy({id: customerId})

      if (!customer) throw new NotFoundException(`Customer does not exist!`)

      if(projectId){
        const project = await this.projectRepo.findOneBy({id: projectId})

        if (!project) throw new NotFoundException(`Project does not exist!`)
      }

      if(jobSiteId){
        const jobSite = await this.jobsiteRepo.findOneBy({id: jobSiteId})

        if (!jobSite) throw new NotFoundException(`Jobsite does not exist!`)
      }

      let count = await this.ticketRepo.createQueryBuilder('entity').where('entity.customerId = :customerId', { customerId }).getCount();

      const isExternal = !currentUser.roles?.includes(UserRole.SD);

      // Create ticket detail
      const ticketDetail = await queryRunner.manager.save(TicketDetail, { ...detail });

      // Common Function to create ticket
      const createTicket = async () => {
        const ticket = new Ticket();
        ticket.ticketType = ticketType;
        ticket.numberOfHoursReq = numberOfHoursReq;
        ticket.numberOfResource = numberOfResource;
        ticket.isExternal = isExternal;
        ticket.ticketDetail = ticketDetail;
        ticket.ticketReceivedTime = new Date();
        ticket.customer = customer;
        ticket.customerTicketNumber = `${customer.customerAbbr}${count++}`;
        ticket.customerName = customer.name;
        ticket.isAdhoc = Boolean(projectId);
        ticket.projectId = projectId || null;
        ticket.jobSiteId = jobSiteId || null;
        ticket.isApproved = Boolean(!isExternal);

        await queryRunner.manager.save(ticket);
        ticket.generateDerivedId();
        return await queryRunner.manager.save(ticket);
      }

      // For ticket type FTE,PTE
      if (ticketType === TicketType.PTE || ticketType === TicketType.FTE) {
        // Create one ticket
        const ticket = await createTicket()

        // Create ticket dates against a ticket

        for (const date of ticketDates) {
          await queryRunner.manager.save(TicketDate, {
            date,
            ticket,
            scheduledTime
          });
        }

      }

      else {
        for (const date of ticketDates) {

          const ticket = await createTicket();

          await queryRunner.manager.save(TicketDate, {
            date,
            ticket,
            scheduledTime
          });

        }
      }

      await queryRunner.commitTransaction();
      return { message: "Ticket Created Successfully!" };

    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error);
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
      relations: { ticketDates: { timeSheets: { resource: true } }, ticketDetail: true, },
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

  async assignResourcesToTicket(currentUser: ICurrentUser, assignResourcesToTicketInput: AssignResourcesToTicketInput): Promise<CommonPayload> {

    const { resourceIds, ticketId } = assignResourcesToTicketInput;

    const ticket = await this.ticketRepo.findOne({ where:{ id: ticketId } })
    if (!ticket || ticket.isApproved === false) throw new NotFoundException(`Ticket doesn't exist or isn't approved.`)

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction()

    try {
      let page = 0;
      const limit = 10;
      let moreRecords = true;

      // Find All Resources
      const resources = await queryRunner.manager.find(Resource, {
        where: {
          id: In(resourceIds),
          deletedAt: IsNull()
        }
      })

      if (resources?.length) {
        // Need to do this with pafination, because there can be many ticketDates like 50 plus
        while (moreRecords) {
          // Find Ticket Dates
          const ticketDates = await queryRunner.manager.find(TicketDate, {
            where: {
              ticketId
            },
            skip: page * limit,
            take: limit
          })

          // Create a timesheet against each ticketDate
          for (const ticketDate of ticketDates) {
            for (const resource of resources) {
              await queryRunner.manager.save(TimeSheet, {
                resource,
                ticketDate
              })
            }
          }

          // Break loop if number of records are less than limit
          if (ticketDates.length < limit) {
            moreRecords = false;
            break;
          }
          // Increment page by 1
          page = page + 1
        }
      }

      // Commit Transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error);
    }
    finally {
      await queryRunner.release()
    }

    return {
      message: "Assigned Successfully"
    }
  }

  async getAllExternalTickets(): Promise<GetAllTicketsPayload>  {

    const [tickets, count] = await this.ticketRepo.findAndCount({
      where: {
        isExternal: true,
        deletedAt: IsNull()
      },
      relations: { ticketDates: { timeSheets: { resource: true } }, ticketDetail: true, },
    })

    return {
      count,
      tickets
    }
  }

  async approveExternalTicket(id: string): Promise<CommonPayload> {

    const ticket = await this.ticketRepo.findOneBy({ id })
    if (!ticket) throw new NotFoundException(`Ticket does not exist!`)

    await this.ticketRepo.update({id: ticket.id}, {isApproved: true})

    return {
      message: "Ticket Approved."
    }
  }

  async changeStatus(changeStatusInput: ChangeStatusInput): Promise<CommonPayload> {

    const ticket = await this.ticketRepo.findOne({ where:{ id: changeStatusInput.ticketId } })
    if (!ticket) throw new NotFoundException(`Ticket does not exist!`)

    await this.ticketRepo.update({id: ticket.id}, {status: changeStatusInput.ticketStatus})

    return {
      message: "Status Changed."
    }
  }
}
