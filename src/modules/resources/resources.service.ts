import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, IsNull, Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../users/entities/role.entity';
import { CreateResourceInput } from '../../users/dto/create-resource-input';
import { RoleService } from '../../users/role.service';
import { CommonPayload } from '../../users/dto/common.dto';
import { Resource } from './entity/resource.entity';
import { UserPaymentMethod } from '../userPaymentMethods/entity/userPaymentMethod.entity';
import { GetAllResourcesInput } from './dto/get-all-resources-input';
import { GetAllResourcesStatsPayload } from './dto/get-all-resources.dto';
import { UpdateResourceInput } from './dto/update-resource-input';
import { RMSDashboardStatsPayload } from './dto/rms-dashboard-stats.dto';
import { ResourceDashboardStatsPayload } from './dto/resource-dashboard-stats.dto';
import { CheckinCheckout, TimeSheet } from '../tickets/entities/timeSheet.entity';
import { TicketsService } from '../tickets/tickets.service';
import { TicketDate } from '../tickets/entities/ticketDate.entity';
import { CheckinCheckoutInput } from './dto/checkin-checkout.input';
import { ICurrentUser } from '../../users/auth/interfaces/current-user.interface';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Resource) private resourceRepo: Repository<Resource>,
    @InjectRepository(UserPaymentMethod) private userPaymentMethodRepo: Repository<UserPaymentMethod>,
    @InjectRepository(TimeSheet) private timeSheetRepo: Repository<TimeSheet>,
    private readonly roleService: RoleService,
    private readonly ticketService: TicketsService
  ) { }


  async getAllResources(getAllResourcesInput: GetAllResourcesInput): Promise<GetAllResourcesStatsPayload> {
    try {
      const { limit = 20, page = 0, searchQuery } = getAllResourcesInput;

      const whereClause = {
        deletedAt: IsNull(),
        requestApproved: true,
      };

      const where = [
        { ...(searchQuery && { email: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { firstName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { lastName: ILike(`%${searchQuery}%`) }), ...whereClause },
        { ...(searchQuery && { country: ILike(`%${searchQuery}%`) }), ...whereClause },

      ];

      const resources = await this.resourceRepo.find({
        where,
        relations: { userPaymentMethod: true, },
        skip: page * limit,
        take: limit
      });

      const count = await this.resourceRepo.count({ where })
      return {
        count,
        resources
      }

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getResource(id: string) {
    const resource = await this.resourceRepo.findOne(
      {
        where: { id, deletedAt: IsNull() },
        relations: { userPaymentMethod: true, onboardedBy: true }
      }
    )
    if (!resource) throw new NotFoundException(`Resource with ${id} does not exist!`)
    return resource
  };

  async getResourceFromUserId(id: string) {
    const resource = await this.resourceRepo.findOne(
      {
        where: { user: { id }, deletedAt: IsNull() },
        relations: { userPaymentMethod: true, onboardedBy: true }
      }
    )
    if (!resource) throw new NotFoundException(`Resource with user ${id} does not exist!`)
    return resource
  };

  async createResource(userId: string, createResourceInput: CreateResourceInput): Promise<CommonPayload> {

    const {
      accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban, email, firstName, lastName, middleName, ...resource
    } = createResourceInput;

    const alreadyExists = await this.userRepo.findOne({
      where: [
        { email },
      ]
    });

    if (alreadyExists) {
      throw new ConflictException('Resource already exists');
    };

    const currentUser = await this.userRepo.findOne({ where: { id: userId } })

    const roleType = UserRole.RESOURCE;
    const role = await this.roleService.findByType(roleType);
    const pass = (Math.random() * 1e16).toString(36);

    // Create User
    const newUser = await this.userRepo.save({
      email, firstName, lastName, middleName,
      password: pass,
      roles: [role],
    })

    // Create Resource
    const newResource = await this.resourceRepo.save({
      ...resource,
      ...(resource?.isOnboarded ? { onboardedAt: new Date(), onboardedBy: currentUser } : {}),
      email, firstName, lastName, middleName,
      requestApproved: true,
      user: newUser
    });

    if (resource?.isOnboarded) {
      currentUser.onboardedResources = [newResource]
      await this.userRepo.save(currentUser);
    }
    await this.userRepo.update({ id: newUser.id }, { resource: newResource })



    if (accountType)
      await this.userPaymentMethodRepo.save({
        accountNumber, accountTitle, accountType, bankAddress, bankName,
        beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
        beneficiaryMiddleName, branchName, sortCode, swiftCode, iban,
        resource: newResource
      })

    // const mail = {
    //   to: newUser.email,
    //   subject: 'Cogent Sign-In credentials.',
    //   from: 'admin@cogentnetworks.com',
    //   text: `Your Cogent account has been created. Please login with your email using this password ${pass}`,
    // };

    // await this.sendgridService.send(mail);

    return { message: "Resource Created Successfully!" };
  }

  async updateResource(currentUserId: string, id: string, updateResourceInput: UpdateResourceInput): Promise<CommonPayload> {

    const {
      accountNumber, accountTitle, accountType, bankAddress, bankName,
      beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
      beneficiaryMiddleName, branchName, sortCode, swiftCode, iban, ...resourceData
    } = updateResourceInput;

    const resource = await this.resourceRepo.findOne({ where: { id }, relations: { userPaymentMethod: true } });

    if (!resource) throw new NotFoundException(`Resource with ${id} does not exist!`);

    const alreadyExists = await this.resourceRepo.findOne({
      where: [
        { email: resourceData?.email },
      ],
      select: { id: true }
    });

    if (alreadyExists?.id !== resource?.id) {
      throw new ConflictException('Resource with this email already exists!');
    };

    if (resourceData?.isOnboarded && !resource?.isOnboarded) {
      const currentUser = await this.userRepo.findOne({ where: { id: currentUserId } })
      resource["onboardedAt"] = new Date();
      resource["onboardedBy"] = currentUser;
    };

    Object.keys(resourceData).forEach((key) => { resource[key] = resourceData[key] });
    resource["requestApproved"] = resource.requestApproved;

    if (!accountType) {
      resource.userPaymentMethod = [];
    }

    await this.resourceRepo.save(resource);

    if (accountType) {
      const paymentPayload = {
        accountNumber, accountTitle, accountType, bankAddress, bankName,
        beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
        beneficiaryMiddleName, branchName, sortCode, swiftCode, iban,
      };
      if (!resource?.userPaymentMethod?.length) {
        await this.userPaymentMethodRepo.save({
          ...paymentPayload,
          resource
        })
      }
      else {
        resource.userPaymentMethod = [{
          ...resource.userPaymentMethod?.[0],
          accountNumber, accountTitle, accountType, bankAddress, bankName,
          beneficiaryAddress, beneficiaryFirstName, beneficiaryLastName,
          beneficiaryMiddleName, branchName, sortCode, swiftCode, iban,
        }]
        await this.resourceRepo.save(resource);
      }
    }

    return { message: "Resource Updated Successfully!" };
  }

  async deleteResource(id: string): Promise<CommonPayload> {
    await this.resourceRepo.update({ id }, { deletedAt: new Date() })
    return { message: "Resource Deleted Successfully!" };
  };


  async getRMSDashboardStats(): Promise<RMSDashboardStatsPayload> {
    const date = new Date();
    const startDate = new Date(date.setDate(date.getDate() - 15));
    const endDate = new Date();

    const totalResourceCount = await this.resourceRepo.count({
      where: {
        deletedAt: IsNull(),
      }
    });

    const newRequestCount = await this.resourceRepo.count({
      where: {
        deletedAt: IsNull(),
        createdAt: Between(startDate, endDate),
        isARequest: true
      }
    });

    const newHiringCount = await this.resourceRepo.count({
      where: {
        deletedAt: IsNull(),
        onboardedAt: Between(startDate, endDate),
        isOnboarded: true
      }
    });

    return {
      totalResourceCount,
      newRequestCount,
      newHiringCount
    }

  };

  async getResourceDashboardStats(): Promise<ResourceDashboardStatsPayload> {

    const lastMonthDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const twoMonthsBeforeDate = new Date(new Date().setMonth(new Date().getMonth() - 2));
    const currentDate = new Date()

    const getPercentage = (prevMonthValue: number, cuurentMonthValue: number): number => {
      const diff = cuurentMonthValue - prevMonthValue;
      if (prevMonthValue == 0) return cuurentMonthValue * 100;
      return +((diff / prevMonthValue) * 100).toFixed(2);
    };

    // Resource Count

    const totalResourceCount = await this.resourceRepo.count({
      where: {
        deletedAt: IsNull(),
      }
    });

    const lastMonthResourceCount = await this.resourceRepo.count({
      where: {
        deletedAt: IsNull(),
        createdAt: Between(twoMonthsBeforeDate, lastMonthDate),
      }
    });

    const currentMonthResourceCount = await this.resourceRepo.count({
      where: {
        deletedAt: IsNull(),
        createdAt: Between(lastMonthDate, currentDate),

      }
    });

    const resourceDifference = getPercentage(lastMonthResourceCount, currentMonthResourceCount)

    // OnBoarding Count

    const totalOnboardedCount = await this.resourceRepo.count({
      where: {
        isOnboarded: true,
        deletedAt: IsNull(),
      }
    });

    const lastMonthOnboardedCount = await this.resourceRepo.count({
      where: {
        isOnboarded: true,
        deletedAt: IsNull(),
        createdAt: Between(twoMonthsBeforeDate, lastMonthDate),

      }
    });

    const currentMonthOnboardedCount = await this.resourceRepo.count({
      where: {
        isOnboarded: true,
        deletedAt: IsNull(),
        createdAt: Between(lastMonthDate, currentDate),

      }
    });

    const onboardedDifference = getPercentage(lastMonthOnboardedCount, currentMonthOnboardedCount)


    // InterviewSchedule Count

    // const totalInterviewScheduleCount = await this.userRepo.count({
    //   where: {
    //     roles: {
    //       role: UserRole.RESOURCE
    //     },
    //     interviewStatus: In(["Completed", "Scheduled"]),
    //     deletedAt: IsNull(),
    //   }
    // });

    // const lastMonthTotalInterviewScheduleCount = await this.userRepo.count({
    //   where: {
    //     roles: {
    //       role: UserRole.RESOURCE
    //     },
    //     isOnboarded: true,
    //     deletedAt: IsNull(),
    //     createdAt: Between(twoMonthsBeforeDate, lastMonthDate),

    //   }
    // });

    // const currentMonthOnboardedCount = await this.userRepo.count({
    //   where: {
    //     roles: {
    //       role: UserRole.RESOURCE
    //     },
    //     isOnboarded: true,
    //     deletedAt: IsNull(),
    //     createdAt: Between(lastMonthDate, currentDate),

    //   }
    // });

    // const onboardedDifference = getPercentage(lastMonthOnboardedCount, currentMonthOnboardedCount)

    return {
      resourceStats: {
        total: totalResourceCount,
        difference: resourceDifference
      },
      onboardedStats: {
        total: totalOnboardedCount,
        difference: onboardedDifference
      }
    }

  };

  async approveUserRequest(id: string) {
    const resource = await this.resourceRepo.findOne({ where: { id } });
    if (!resource) throw new NotFoundException(`Resource does not exist!`);

    await this.resourceRepo.save({ id: resource.id, requestApproved: true })

    const mail = {
      to: resource.email,
      subject: 'Request.',
      from: 'admin@cogentnetworks.com',
      text: `Your Cogent account request is approved. Please login and update your data.`,
    };

    // await this.sendgridService.send(mail);

    return { message: "Request Approved Successfully!" };
  }


  async getNewRequestUsers(getAllResourcesInput: GetAllResourcesInput): Promise<GetAllResourcesStatsPayload> {
    try {
      const { limit = 20, page = 0 } = getAllResourcesInput;

      const where = {
        deletedAt: IsNull(),
        requestApproved: false,
      };

      const [resources, count] = await this.resourceRepo.findAndCount({
        where,
        relations: { userPaymentMethod: true, },
        skip: page * limit,
        take: limit
      });

      return { count, resources }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getResourceTickets(resourceId: string): Promise<TicketDate[]>{
    try{
      const resource = await this.resourceRepo.findOne({
        where: { id: resourceId },
        relations: {timeSheets: true},
      });

      if (resource && resource.timeSheets){
        let ticketDateIds = resource.timeSheets.map((timesheet: TimeSheet) => timesheet.ticketDateId);
        ticketDateIds = Array.from(new Set(ticketDateIds));
        const resourceTickets = await this.ticketService.getTicketByTicketDate(ticketDateIds)
        return resourceTickets
      }

      return []
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async timeSheetCheckInOut(currentUser: ICurrentUser, checkinCheckoutInput: CheckinCheckoutInput): Promise<CommonPayload>{
    try{
      const timeSheet = await this.timeSheetRepo.findOne({
        where: {
          resourceId: checkinCheckoutInput.resourceId,
          ticketDateId: checkinCheckoutInput.ticketDateId
        }
      })

      if (currentUser.roles?.includes(UserRole.SD)){

        if(checkinCheckoutInput.checkinOrCheckout === CheckinCheckout.CHECK_IN){
          await this.timeSheetRepo.update({id: timeSheet.id}, {sdIdCheckIn: currentUser.userId, sdCheckIn: checkinCheckoutInput.time})
        } else if (checkinCheckoutInput.checkinOrCheckout === CheckinCheckout.CHECK_OUT && timeSheet.sdCheckIn){
          await this.timeSheetRepo.update({id: timeSheet.id}, {sdIdCheckOut: currentUser.userId, sdCheckOut: checkinCheckoutInput.time})
        } else{
          throw new InternalServerErrorException({message: "Provide check-in time first."});
        }

      } else if(currentUser.roles?.includes(UserRole.FEOPS)){

        if(checkinCheckoutInput.checkinOrCheckout === CheckinCheckout.CHECK_IN){
          await this.timeSheetRepo.update({id: timeSheet.id}, {feopsIdCheckIn: currentUser.userId, feopsCheckIn: checkinCheckoutInput.time})
        } else if (checkinCheckoutInput.checkinOrCheckout === CheckinCheckout.CHECK_OUT && timeSheet.feopsCheckIn){
          await this.timeSheetRepo.update({id: timeSheet.id}, {feopsIdCheckOut: currentUser.userId, feopsCheckOut: checkinCheckoutInput.time})
        } else{
          throw new InternalServerErrorException({message: "Provide check-in time first."});
        }

      } else{

        if(checkinCheckoutInput.checkinOrCheckout === CheckinCheckout.CHECK_IN){
          await this.timeSheetRepo.update({id: timeSheet.id}, { checkIn: checkinCheckoutInput.time})
        } else if (checkinCheckoutInput.checkinOrCheckout === CheckinCheckout.CHECK_OUT && timeSheet.checkIn){
          await this.timeSheetRepo.update({id: timeSheet.id}, { checkOut: checkinCheckoutInput.time})
        } else{
          throw new InternalServerErrorException({message: "Provide check-in time first."});
        }

      }
      return{
        message: "Time Updated."
      }
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
