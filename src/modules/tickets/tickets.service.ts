import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { TicketDetail } from './entities/ticketDetail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, DataSource, In, ILike, Between } from 'typeorm';
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
import { TicketAttachment } from './entities/ticketAttachment.entity';
import { GetTodayTicketsInput } from './dto/get-today-tickets-input';
import { GetTodayTicketsPayload } from './dto/get-today-tickets.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>,
    @InjectRepository(TicketDate) private ticketDateRepo: Repository<TicketDate>,
    @InjectRepository(TicketAttachment) private ticketAttachmentRepo: Repository<TicketAttachment>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(Jobsite) private jobsiteRepo: Repository<Jobsite>,
    @InjectRepository(Jobsite) private timeSheetRepo: Repository<TimeSheet>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private dataSource: DataSource
  ) { }

  async create(currentUser: ICurrentUser, createTicketInput: CreateTicketInput): Promise<CommonPayload> {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction()
    try {
      const { ticketType, customerId, projectId, jobSiteId, ticketDates, numberOfHoursReq, numberOfResource, scheduledTime, attachments, ...detail } = createTicketInput;

      const customer = await this.customerRepo.findOneBy({ id: customerId })

      if (!customer) throw new NotFoundException(`Customer does not exist!`)

      if (projectId) {
        const project = await this.projectRepo.findOneBy({ id: projectId })

        if (!project) throw new NotFoundException(`Project does not exist!`)
      }

      if (jobSiteId) {
        const jobSite = await this.jobsiteRepo.findOneBy({ id: jobSiteId })

        if (!jobSite) throw new NotFoundException(`Jobsite does not exist!`)
      }

      let count = await this.ticketRepo.createQueryBuilder('entity').where('entity.customerId = :customerId', { customerId }).getCount();

      const isExternal = !currentUser.roles?.includes(UserRole.SD);

      // Create ticket detail
      const ticketDetail = await queryRunner.manager.save(TicketDetail, { ...detail });

      // Add Attachments
      if (attachments.length) {
        for (const attachmentUrl of attachments) {
          await queryRunner.manager.save(TicketAttachment,
            {
              url: attachmentUrl,
              ticketDetail
            }
          );
        }
      }

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
        ticket.isAdhoc = Boolean(!projectId);
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

  async findAll(currentUser: ICurrentUser, getAllTicketsInput: GetAllTicketsInput): Promise<GetAllTicketsPayload> {
    try{
      const { limit = 20, page = 0, searchQuery, external, customerId, approved } = getAllTicketsInput;

      // Check if loggedIn user is customer, if yes, then only return its tickets
      // If no then check if customerId is passed in params, if yes then fetch records for that cusotmer
      const isCurrentUserCustomer = currentUser.roles.includes(UserRole.CUSTOMER);
      let filterCustomerId = customerId;
      if (isCurrentUserCustomer) {
        const user = await this.userRepo.findOne({
          where: {
            id: currentUser.userId,
            deletedAt: IsNull()
          },
          relations: { customer: true },
          select: { id: true, customer: { id: true } }
        })
        if (user) {
          filterCustomerId = user.customer.id
        }
      }

      const whereClause = {
        deletedAt: IsNull(),
        isExternal: external ? true : null,
        isApproved: approved ? false : true,
        ...(filterCustomerId && { customerId: filterCustomerId })
      };

      const where = [
        { ...(searchQuery && { customerTicketNumber: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { customerName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { cogentCaseNumber: ILike(`%${searchQuery}%`) }), ...whereClause },
      ];

      const [tickets, count] = await this.ticketRepo.findAndCount({
        where,
        relations: { ticketDates: true, ticketDetail: { attachments: true } },
        skip: page * limit,
        take: limit,
      });

      return {
        count,
        tickets,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Ticket> {
    try {
      const ticket = await this.ticketRepo.findOne({
        where: {
          id,
          deletedAt: IsNull()
        },
        relations: { ticketDates: true, ticketDetail: { attachments: true } },
      })

      return ticket
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateTicket(id: string, updateTicketInput: UpdateTicketInput) {
    try {
      const ticket = await this.ticketRepo.findOne({
        where: { id, deletedAt: IsNull() },
        relations: { ticketDates: true }
      });

      if (!ticket) throw new NotFoundException(`Ticket does not exist!`)

      const firstTicketDate = ticket.ticketDates[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const timeDifference = firstTicketDate.date.getTime() - yesterday.getTime();
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      if (hoursDifference > 24) {
        // write update ticket code here.
        return { message: "Ticket Updated Successfully!" };
      } else {
        throw new Error("Update Ticket is only possible before 24 hours.");
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteTicket(id: string): Promise<CommonPayload> {
    try {
      const ticket = await this.ticketRepo.findOne({
        where: { id, deletedAt: IsNull() },
        relations: { ticketDates: { timeSheets: true }, ticketDetail: true }
      });

      if (!ticket) {
        throw new NotFoundException(`Ticket does not exist!`);
      }

      const firstTicketDate = ticket.ticketDates[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const timeDifference = firstTicketDate.date.getTime() - yesterday.getTime();
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      if (hoursDifference > 24) {
        ticket.deletedAt = new Date();
        await this.ticketRepo.save(ticket);

        for (const ticketDate of ticket.ticketDates) {
          await this.ticketDateRepo.update(ticketDate.id, { deletedAt: new Date() });

          for (const timeSheet of ticketDate.timeSheets) {
            await this.timeSheetRepo.update(timeSheet.id, { deletedAt: new Date() });
          }
        }

        return { message: "Ticket Deleted Successfully!" };
      } else {
        throw new Error("Delete Ticket is only possible before 24 hours.");
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }



  async assignResourcesToTicket(currentUser: ICurrentUser, assignResourcesToTicketInput: AssignResourcesToTicketInput): Promise<CommonPayload> {

    const { resourceIds, ticketId } = assignResourcesToTicketInput;

    const ticket = await this.ticketRepo.findOne({ where: { id: ticketId } })
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

      let workOrderArray = []

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
              let timeSheet = await queryRunner.manager.save(TimeSheet, {
                resource,
                ticketDate
              })
              workOrderArray.push(timeSheet.id)
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
      await this.ticketRepo.update({ id: ticketId }, { cogentWorkOrderNumber: workOrderArray })

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

  async approveExternalTicket(id: string): Promise<CommonPayload> {

    try {
      const ticket = await this.ticketRepo.findOne({ where: { id: id, deletedAt: IsNull() } })
      if (!ticket) throw new NotFoundException(`Ticket does not exist!`)

      await this.ticketRepo.update({ id: ticket.id }, { isApproved: true })

      return {
        message: "Ticket Approved."
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async changeStatus(changeStatusInput: ChangeStatusInput): Promise<CommonPayload> {

    try {
      const ticket = await this.ticketRepo.findOne({ where: { id: changeStatusInput.ticketId, deletedAt: IsNull() } })
      if (!ticket) throw new NotFoundException(`Ticket does not exist!`)

      await this.ticketRepo.update({ id: ticket.id }, { status: changeStatusInput.ticketStatus })

      return {
        message: "Status Changed."
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getTicketByTicketDate(ticketDateIds: string[]): Promise<TicketDate[]> {
    try {
      let ticketDates = await this.ticketDateRepo.find({
        where: {
          id: In(ticketDateIds),
          deletedAt: IsNull()
        },
        relations: {
          ticket: { ticketDetail: true },
        },
      });
      return ticketDates;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getTodayTicket(getTodayTicketsInput: GetTodayTicketsInput): Promise<GetAllTicketsPayload> {
    try {
      const { page = 0, limit = 20, searchQuery = "" } = getTodayTicketsInput;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      // const whereClause = {
      //   ticket: {
      //     deletedAt: IsNull()
      //   },
      //   date: Between(today, tomorrow),
      // };

      // const where = [
      //   { ...whereClause, ...(searchQuery && { ticket: { customerTicketNumber: ILike(`%${searchQuery}%`), ...whereClause.ticket } }) },
      //   { ...whereClause, ...(searchQuery && { ticket: { customerName: ILike(`%${searchQuery}%`), ...whereClause.ticket } }) },
      //   { ...whereClause, ...(searchQuery && { ticket: { cogentCaseNumber: ILike(`%${searchQuery}%`), ...whereClause.ticket } }) },
      // ];

      // const [ticketDates, count] = await this.ticketDateRepo.findAndCount({
      //   where,
      //   relations: { ticket: { ticketDetail: { attachments: true } } },
      //   skip: page * limit,
      //   take: limit
      // });

      const whereClause = {
        ticketDates: {
          date: Between(today, tomorrow),
        },
        deletedAt: IsNull()
      };

      const where = [
        { ...(searchQuery && { customerTicketNumber: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { customerName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { cogentCaseNumber: ILike(`%${searchQuery}%`) }), ...whereClause },]

      const [tickets, count] = await this.ticketRepo.findAndCount({
        where: where,
        relations: { ticketDates: true, ticketDetail: { attachments: true } },
        skip: page * limit,
        take: limit
      });

      return {
        count,
        tickets
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
